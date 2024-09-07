import { useEffect, useState } from "react";
import { getTicker } from "../../api/clientFunctions";
import { Ticker } from "../../utils/types";
import classNames from "classnames";
import { SocketManager } from "../../lib/SocketManager";

type Props = {
  market: string;
};

const MarketBar = (props: Props) => {
  const [ticker, setTicker] = useState<Ticker | null>(null);

  useEffect(() => {
    getTicker(props.market).then((new_ticker) => {
      setTicker(() => new_ticker);
    });

    SocketManager.getInstance().registerCallback(
      "ticker",
      (data: Ticker) => {
        setTicker(data);
      },
      `TICKER-MARKET-${props.market}`
    );

    SocketManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`ticker.${props.market}`],
    });

    return () => {
      console.log("unmounting market bar");

      SocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${props.market}`],
      });
      SocketManager.getInstance().deRegisterCallback(
        "ticker",
        `TICKER-MARKET-${props.market}`
      );
    };
  }, [props.market]);

  return (
    <div className="flex flex-row items-center justify-between gap-8 overflow-y-auto px-4 h-[72px] w-full">
      <p className="text-sm font-medium">{props.market.replace("_", " / ")}</p>

      <div className="flex flex-row items-center gap-2 flex-1">
        <p
          className={classNames("font-medium text-2xl flex", {
            "text-white": ticker === null,
            "text-green-500":
              ticker !== null && Number(ticker.priceChange) >= 0,
            "text-red-500": ticker !== null && Number(ticker.priceChange) < 0,
          })}
        >
          {ticker?.lastPrice}
        </p>
      </div>
    </div>
  );
};

export default MarketBar;
