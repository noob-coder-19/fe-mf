import classNames from "classnames";
import { useEffect, useState } from "react";
import TradeList from "./TradeList";
import Book from "./Book";
import { getDepth, getTicker, getTrades } from "../../api/clientFunctions";
import { Depth as DepthType, Ticker, Trade } from "../../utils/types";
import { SocketManager } from "../../lib/SocketManager";

type Props = {
  market: string;
};

const N = 30;

const Depth = ({ market }: Props) => {
  const [isOrderSelected, setIsOrderSelected] = useState<boolean>(true);
  const [tradeList, setTradeList] = useState<Trade[]>([]);
  const [bids, setBids] = useState<[string, string][]>([]);
  const [asks, setAsks] = useState<[string, string][]>([]);
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [hasPriceIncreased, setHasPriceIncreased] = useState(true);

  const toggleIsOrderSelected = (new_isOrderSelected?: boolean) => {
    if (new_isOrderSelected !== undefined) {
      setIsOrderSelected(new_isOrderSelected);
      return;
    }

    setIsOrderSelected((old) => {
      return !old;
    });
  };

  useEffect(() => {
    const initApiCalls = async () => {
      const promises = [];

      promises.push(getDepth(market));
      promises.push(getTicker(market));
      promises.push(getTrades(market));

      const [depth, t, trades] = (await Promise.all(promises)) as [
        DepthType,
        Ticker,
        Trade[]
      ];

      const filteredTrades = trades.length > N ? trades.slice(0, N) : trades;
      setBids(depth.bids);
      setAsks(depth.asks);
      setCurrentPrice(t.lastPrice);
      setHasPriceIncreased(Number(t.priceChange) >= 0);
      setTradeList(filteredTrades);
    };

    initApiCalls().then(() => {
      SocketManager.getInstance().registerCallback(
        "depth",
        ({
          asks,
          bids,
        }: {
          asks: [string, string][];
          bids: [string, string][];
        }) => {
          setAsks((old_asks) => {
            const ask_lookup: Record<string, string> = {};
            asks.map((ask) => {
              ask_lookup[ask[0]] = ask[1];
            });

            let new_asks = structuredClone(old_asks);
            for (let i = 0; i < new_asks.length; i++) {
              const price = new_asks[i][0];
              // if the ask already exists, update the size
              if (ask_lookup[price] !== undefined) {
                new_asks[i][1] = ask_lookup[price];
                delete ask_lookup[price];
              }
            }

            for (const price in ask_lookup) {
              new_asks.push([price, ask_lookup[price]]);
            }

            new_asks = new_asks.filter((ask) => {
              return Number(ask[1]) > 0;
            });

            new_asks.sort((a, b) => {
              // sort the asks in ascending order by ask[0]
              return Number(a[0]) - Number(b[0]);
            });

            return new_asks;
          });

          setBids((old_bids) => {
            const bid_lookup: Record<string, string> = {};
            bids.map((ask) => {
              bid_lookup[ask[0]] = ask[1];
            });

            let new_bids = structuredClone(old_bids);
            for (let i = 0; i < new_bids.length; i++) {
              const price = new_bids[i][0];
              // if the ask already exists, update the size
              if (bid_lookup[price] !== undefined) {
                new_bids[i][1] = bid_lookup[price];
                delete bid_lookup[price];
              }
            }

            for (const price in bid_lookup) {
              new_bids.push([price, bid_lookup[price]]);
            }

            new_bids = new_bids.filter((ask) => {
              return Number(ask[1]) > 0;
            });

            new_bids.sort((a, b) => {
              // sort the asks in ascending order by ask[0]
              return Number(a[0]) - Number(b[0]);
            });

            return new_bids;
          });
        },
        `DEPTH-${market}`
      );
      SocketManager.getInstance().registerCallback(
        "ticker",
        (data: Ticker) => {
          setCurrentPrice(data.lastPrice);
        },
        `TICKER-BOOK-${market}`
      );
      SocketManager.getInstance().registerCallback(
        "trade",
        (data: Trade) => {
          setTradeList((old_trades) => {
            const new_trades = structuredClone([data, ...old_trades]);
            new_trades.pop();

            return new_trades;
          });
        },
        `TRADE-${market}`
      );

      SocketManager.getInstance().sendMessage({
        method: "SUBSCRIBE",
        params: [`depth.200ms.${market}`],
      });
      SocketManager.getInstance().sendMessage({
        method: "SUBSCRIBE",
        params: [`ticker.${market}`],
      });
      SocketManager.getInstance().sendMessage({
        method: "SUBSCRIBE",
        params: [`trade.${market}`],
      });
    });

    return () => {
      SocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.200ms.${market}`],
      });
      SocketManager.getInstance().deRegisterCallback(
        "depth",
        `DEPTH-${market}`
      );

      SocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
      SocketManager.getInstance().deRegisterCallback(
        "ticker",
        `TICKER-BOOK-${market}`
      );

      SocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade.${market}`],
      });
      SocketManager.getInstance().deRegisterCallback(
        "trade",
        `TRADE-${market}`
      );
    };
  }, [market]);

  return (
    <div className="flex flex-col w-[300px] rounded-lg overflow-hidden bg-gray-900 gap-2 h-full px-3">
      {/* Type of List: Book or Trade */}
      <>
        <div className="flex flex-row gap-4 py-4">
          <button
            onClick={() => {
              toggleIsOrderSelected(true);
            }}
            className={classNames(
              "text-center text-sm py-1 px-3 hover:opacity-90 rounded-lg",
              {
                "bg-white/10 font-medium": isOrderSelected,
                "text-gray-400": !isOrderSelected,
              }
            )}
          >
            Book
          </button>

          <button
            onClick={() => {
              toggleIsOrderSelected(false);
            }}
            className={classNames(
              "text-center text-sm py-1 px-3 hover:opacity-90 rounded-lg",
              {
                "bg-white/10 font-medium": !isOrderSelected,
                "text-gray-400": isOrderSelected,
              }
            )}
          >
            Trades
          </button>
        </div>
      </>

      {/* Table title */}
      <>
        <div className="flex flex-row items-center">
          <>
            <p className="text-xs  w-[33%] text-gray-300">Price</p>
            <p className="text-xs w-[33%] text-right text-gray-300">
              {isOrderSelected ? "Size" : "Qty"}
            </p>
            <p className="text-xs w-[33%] text-right text-gray-300">
              {isOrderSelected ? "Total" : "Time"}
            </p>
          </>
        </div>
      </>

      {/* Table content */}
      <>
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          <div
            id="book-container"
            className="max-h-[536px] snap-mandatory no-scrollbar snap-y scroll-smooth overflow-y-auto no-scrollbar"
          >
            {isOrderSelected ? (
              <>
                {asks.length > 0 && bids.length > 0 ? (
                  <Book
                    price={currentPrice}
                    hasPriceIncreased={hasPriceIncreased}
                    asks={asks}
                    bids={bids}
                  ></Book>
                ) : null}
              </>
            ) : (
              <>
                <TradeList tradeList={tradeList} market={market}></TradeList>
              </>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Depth;
