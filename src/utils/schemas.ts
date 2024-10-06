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

export const KLineSchema = z.object({
  t: z.coerce.date().default(new Date()),
  o: z.number().default(0),
  h: z.number().default(0),
  l: z.number().default(0),
  c: z.number().default(0),
  v: z.number().default(0),
});
export type KLine = z.infer<typeof KLineSchema>;

export const CreateOrderSchema = z.object({
  symbol: z.string(),
  side: z.enum(["buy", "sell"]),
  quantity: z
    .number()
    .gt(0)
    .transform((value) => value.toString()),
  price: z
    .number()
    .gt(0)
    .transform((value) => value.toString()),
  userId: z.string(),
});
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
