import {
  ColorType,
  createChart as createLightWeightChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import { KLine } from "../utils/schemas";

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

  public update(updatedPrice: KLine) {
    const lastTime = updatedPrice.t.getTime() / 1000;
    this.candleSeries.update({
      time: this.lastUpdateTime as UTCTimestamp,
      open: updatedPrice.o,
      low: updatedPrice.l,
      high: updatedPrice.h,
      close: updatedPrice.c,
    });

    if (lastTime > this.lastUpdateTime) {
      this.lastUpdateTime = lastTime;
    }
  }

  public destroy() {
    this.chart.remove();
  }
}
