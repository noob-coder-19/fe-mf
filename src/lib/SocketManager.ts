import { Ticker, Trade } from "../utils/schemas";

type CallbacksType = Record<
  string,
  {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- data can be variable depending upon the event
    callback: { (data: any): void };
  }[]
>;

export class SocketManager {
  private ws: WebSocket;
  private id: number;
  private callbacks: CallbacksType = {};
  private bufferedMessages: string[];
  private static instance: SocketManager;
  private initialized: boolean = false;

  private constructor(BASE_URL: string) {
    this.ws = new WebSocket(BASE_URL);
    this.bufferedMessages = [];
    this.id = 1;
    this.init();
  }

  public static getInstance() {
    if (!this.instance) {
      const BASE_URL = import.meta.env.VITE_WEBSOCKET_URL;

      this.instance = new SocketManager(BASE_URL);
    }

    return this.instance;
  }

  init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferedMessages.forEach((message) => {
        this.ws.send(message);
      });
      this.bufferedMessages = [];
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message, event.data);
      const type = message.e;

      //   console.log(message, this.callbacks);

      if (this.callbacks[type] === undefined) {
        return;
      }

      if (type === "depth") {
        const data = {
          asks: message.payload.a,
          bids: message.payload.b,
        };

        this.callbacks[type].map((cb) => cb.callback(data));
      } else if (type === "ticker") {
        const data: Ticker = {
          p: message.p,
          q: message.q,
          v: message.v,
          c: message.c,
        };

        this.callbacks[type].map((cb) => cb.callback(data));
      } else if (type === "trade") {
        const data: Trade[] = message.payload.map(
          (trade: { t: number; p: string; q: string; T: number }) => {
            return {
              trade_id: trade.t,
              price: trade.p,
              volume: trade.q,
              time: new Date(trade.T / 1000.0),
            };
          }
        );

        this.callbacks[type].map((cb) => cb.callback(data));
      } else if (type === "kline") {
        this.callbacks[type].map((cb) => cb.callback(message.k));
      }
    };
  }

  sendMessage<T>(message: Record<string, T>) {
    const messageToSend = {
      ...message,
      id: this.id++,
    };
    if (!this.initialized) {
      this.bufferedMessages.push(JSON.stringify(messageToSend));
      return;
    }
    this.ws.send(JSON.stringify(messageToSend));
  }

  async registerCallback<T>(
    type: string,
    callback: (data: T) => void,
    id: string
  ) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({ callback, id });
  }

  async deRegisterCallback(type: string, id: string) {
    if (this.callbacks[type]) {
      const index = this.callbacks[type].findIndex(
        (callback) => callback.id === id
      );
      if (index !== -1) {
        this.callbacks[type].splice(index, 1);
      }
    }
  }
}
