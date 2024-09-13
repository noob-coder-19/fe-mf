import {
  DepthSchema,
  Depth,
  Ticker,
  TickerSchema,
  Trade,
  TradeSchema,
} from "../utils/schemas";
import { KLine } from "../utils/types";
import axiosClient from "./axiosInstance";
import ENDPOINTS from "./endpoints";

export const getTicker = async (market: string): Promise<Ticker> => {
  const response = await axiosClient({
    method: "GET",
    url: ENDPOINTS.TICKERS,
    params: {
      symbol: market,
    },
  });

  const parsedTickerData = TickerSchema.safeParse(response.data);

  if (!parsedTickerData.success) {
    throw new Error("Invalid ticker");
  }

  return parsedTickerData.data;
};

export const getTickers = async (): Promise<Ticker[]> => {
  const response = await axiosClient({
    method: "GET",
    url: ENDPOINTS.TICKERS,
  });

  return response.data;
};

export const getDepth = async (market: string): Promise<Depth> => {
  const response = await axiosClient({
    method: "GET",
    url: `${ENDPOINTS.DEPTH}/${market}`,
  });

  const parsedDepthData = DepthSchema.safeParse(response.data);

  if (!parsedDepthData.success) {
    throw new Error("Invalid depth data");
  }

  return parsedDepthData.data;
};

export const getTrades = async (market: string): Promise<Trade[]> => {
  const response = await axiosClient({
    method: "GET",
    url: ENDPOINTS.TRADE_LIST,
    params: {
      symbol: market,
    },
  });

  if (!Array.isArray(response.data)) {
    throw new Error("Invalid trade list");
  }

  const trades: Trade[] = [];
  for (const trade of response.data) {
    const parsedTrade = TradeSchema.safeParse(trade);

    if (!parsedTrade.success) {
      throw new Error("Invalid trade");
    }

    trades.push(parsedTrade.data);
  }

  return trades;
};

export const getKlines = async (
  market: string,
  interval: string,
  startTime: Date,
  endTime: Date
): Promise<KLine[]> => {
  const response = await axiosClient({
    method: "GET",
    url: ENDPOINTS.K_LINES,
    params: {
      symbol: market,
      interval,
      startTime,
      endTime,
    },
  });

  return response.data;
};
