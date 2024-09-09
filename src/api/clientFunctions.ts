import { Ticker, TickerSchema } from "../utils/schemas";
import { Depth, KLine, Trade } from "../utils/types";
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
    url: ENDPOINTS.DEPTH,
    params: {
      symbol: market,
    },
  });

  return response.data;
};

export const getTrades = async (market: string): Promise<Trade[]> => {
  const response = await axiosClient({
    method: "GET",
    url: ENDPOINTS.TRADE_LIST,
    params: {
      symbol: market,
    },
  });

  return response.data;
};

export const getKlines = async (
  market: string,
  interval: string,
  startTime: number,
  endTime: number
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
