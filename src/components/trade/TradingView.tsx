import { useEffect, useRef } from "react";
import { getKlines } from "../../api/clientFunctions";
import { ChartManager } from "../../lib/LiveCharts";
import { UTCTimestamp } from "lightweight-charts";
import { SocketManager } from "../../lib/SocketManager";
import { KLine, KLineSchema } from "../../utils/schemas";

type Props = {
  market: string;
};

const TradingView = ({ market }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager | null>(null);

  useEffect(() => {
    const init = async () => {
      if (chartRef.current === null) {
        return;
      }

      // const now = Date.now() + 19800000; // 5 hours 30 minutes in ms
      const now = Date.now();

      const klineData: KLine[] = await getKlines(
        market,
        import.meta.env.VITE_INTERVAL,
        new Date(now - 1000 * 60 * 60 * 24 * 7),
        // Math.floor((new Date().getTime() - 1000 * 60 * 60 * 4) / 1000), // Use 4 hours for testing with 1m interval
        new Date(now)
      );

      if (chartManagerRef.current) {
        chartManagerRef.current.destroy();
      }

      const chartManager = new ChartManager(
        chartRef.current,
        klineData
          .map((kline) => {
            return {
              close: kline.c,
              high: kline.h,
              low: kline.l,
              open: kline.o,
              time: (kline.t.getTime() / 1000) as UTCTimestamp,
            };
          })
          .sort((a, b) => (a.time < b.time ? -1 : 1)) || [],
        {
          background: "transparent",
          color: "white",
        }
      );

      chartManagerRef.current = chartManager;
    };

    init().then(() => {
      SocketManager.getInstance().registerCallback(
        "kline",
        (data: KLine) => {
          const kline = KLineSchema.parse(data);
          chartManagerRef.current?.update(kline);
        },
        `KLINE-${market}`
      );

      SocketManager.getInstance().sendMessage({
        method: "SUBSCRIBE",
        params: [`kline.${market}`],
      });
    });

    return () => {
      SocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`kline.${import.meta.env.VITE_INTERVAL}.${market}`],
      });

      SocketManager.getInstance().deRegisterCallback(
        `kline.${import.meta.env.VITE_INTERVAL}.${market}`,
        `KLINE-${market}`
      );
    };
  }, [market, chartRef]);

  return (
    <div ref={chartRef} className="flex flex-1 bg-gray-900 rounded-xl"></div>
  );
};

export default TradingView;
