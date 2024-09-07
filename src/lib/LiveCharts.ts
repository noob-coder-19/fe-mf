import {
  ColorType,
  createChart as createLightWeightChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import { KlineResponseType } from "../utils/types";

interface CandleDataType {
  high: number;
  close: number;
  open: number;
  low: number;
  time: UTCTimestamp;
}

export class ChartManager {
  private candleSeries: ISeriesApi<"Candlestick">;
  private lastUpdateTime: number = 0;
  private chart: IChartApi;

  constructor(
    ref: HTMLDivElement,
    initialData: CandleDataType[],
    layout: { background: string; color: string }
  ) {
    const chart = createLightWeightChart(ref, {
      autoSize: true,
      overlayPriceScales: {
        ticksVisible: true,
        borderVisible: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        entireTextOnly: true,
      },
      grid: {
        horzLines: {
          visible: true,
          color: "rgba(255,255,255,0.1)",
        },
        vertLines: {
          visible: true,
          color: "rgba(255,255,255,0.1)",
        },
      },
      layout: {
        background: {
          type: ColorType.Solid,
          color: layout.background,
        },
        textColor: "white",
      },
    });
    this.chart = chart;
    this.candleSeries = chart.addCandlestickSeries();

    this.candleSeries.setData(initialData);

    this.lastUpdateTime = initialData[initialData.length - 1].time;
  }

  public update(updatedPrice: KlineResponseType) {
    this.candleSeries.update({
      time: this.lastUpdateTime as UTCTimestamp,
      open: Number(updatedPrice.open),
      low: Number(updatedPrice.low),
      high: Number(updatedPrice.high),
      close: Number(updatedPrice.close),
    });

    if (updatedPrice.new_candle) {
      this.lastUpdateTime = updatedPrice.timestamp;

      console.log(
        `last update time: ${new Date(this.lastUpdateTime)} \n\n\n\n`
      );
    }
  }

  public destroy() {
    this.chart.remove();
  }
}
