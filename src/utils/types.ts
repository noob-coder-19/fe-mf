export interface KLine {
  close: string;
  end: string;
  high: string;
  low: string;
  open: string;
  start: string;
  quoteVolume?: string;
  trades?: string;
  volume?: string;
}

export interface Trade {
  id: number;
  isBuyerMaker: boolean;
  price: string;
  quantity: string;
  quoteQuantity?: string;
  timestamp: number;
}

export interface Depth {
  bids: [string, string][];
  asks: [string, string][];
  lastUpdateId: string;
}

export interface Ticker {
  firstPrice: string;
  high: string;
  lastPrice: string;
  low: string;
  priceChange: string;
  priceChangePercent: string;
  symbol?: string;
  quoteVolume?: string;
  trades?: string;
  volume?: string;
}

export interface KlineResponseType extends Omit<KLine, "start" | "end"> {
  timestamp: number;
  new_candle: boolean;
}
