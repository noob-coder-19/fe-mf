import { z } from "zod";

export const TickerSchema = z.object({
  t: z.coerce.date().default(new Date()),
  c: z.coerce.number().default(0),
  p: z.coerce.number().default(0),
  q: z.coerce.number().default(0),
  v: z.coerce.number().default(0),
});
export type Ticker = z.infer<typeof TickerSchema>;
