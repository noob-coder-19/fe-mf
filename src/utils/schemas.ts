import { z } from "zod";

export const TickerSchema = z.object({
  c: z.coerce.number().default(0),
  p: z.coerce.number().default(0),
  q: z.coerce.number().default(0),
  v: z.coerce.number().default(0),
});
export type Ticker = z.infer<typeof TickerSchema>;

export const TradeSchema = z.object({
  time: z.coerce.date().default(new Date()),
  trade_id: z.string().default(""),
  price: z.coerce.number().default(0),
  volume: z.coerce.number().default(0),
});
export type Trade = z.infer<typeof TradeSchema>;

export const DepthSchema = z.object({
  asks: z.array(z.array(z.string()).length(2)),
  bids: z.array(z.array(z.string()).length(2)),
});
export type Depth = z.infer<typeof DepthSchema>;
