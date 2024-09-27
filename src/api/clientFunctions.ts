import useStore from "../store";
import {
  DepthSchema,
  Depth,
  Ticker,
  TickerSchema,
  Trade,
  TradeSchema,
  KLineSchema,
  KLine,
} from "../utils/schemas";
import { Balance } from "../utils/types";
import axiosClient from "./axiosInstance";
import ENDPOINTS from "./endpoints";
import protectedAxiosClient from "./protectedAxiosInstance";

export const getAccessToken = async () => {
  const response = await axiosClient({
    method: "POST",
    url: ENDPOINTS.REFRESH_TOKEN,
  });

  useStore.getState().setUserId(response.data.userId);

  return response.data.accessToken;
};

export const loginController = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await axiosClient({
    method: "POST",
    url: ENDPOINTS.LOGIN,
    data: {
      email,
      password,
    },
  });

  useStore.getState().setUserId(response.data.userId);
  return response.data.accessToken;
};

export const registerController = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await axiosClient({
    method: "POST",
    url: ENDPOINTS.REGISTER,
    data: {
      email,
      password,
    },
  });

  return response.data.accessToken;
};

export const logoutController = async (): Promise<void> => {
  await axiosClient({
    method: "POST",
    url: ENDPOINTS.LOGOUT,
  });

  useStore.getState().setUserId(null);
};

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

  if (!Array.isArray(response.data)) {
    throw new Error("Invalid klines");
  }

  const klines: KLine[] = [];
  for (const kline of response.data) {
    const parsedKline = KLineSchema.safeParse(kline);

    if (!parsedKline.success) {
      throw new Error("Invalid kline");
    }

    klines.push(parsedKline.data);
  }

  return klines;
};

export const getBalance = async (
  userId: string
): Promise<Record<string, Balance>> => {
  console.log(protectedAxiosClient);

  const response = await protectedAxiosClient({
    method: "GET",
    url: `${ENDPOINTS.GET_BALANCE}/${userId}`,
  });

  if (!response.data.balance) {
    throw new Error("Invalid balance");
  }

  return response.data.balance;
};
