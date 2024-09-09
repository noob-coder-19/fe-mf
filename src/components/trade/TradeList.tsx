import classNames from "classnames";
import { Trade } from "../../utils/schemas";

type Props = {
  market: string;
  tradeList: Trade[];
};

const TradeList = ({ tradeList = [] }: Props) => {
  return (
    <>
      <div className="flex flex-col flex-1 gap-px">
        {tradeList.map((trade, index) => {
          if (index === tradeList.length - 1) {
            return null;
          }

          return (
            <TradeItem
              key={trade.trade_id}
              price={trade.price}
              time={trade.time}
              volume={trade.volume}
              prevPrice={tradeList[index + 1].price}
            ></TradeItem>
          );
        })}
      </div>
    </>
  );
};

interface TradeItemProps extends Pick<Trade, "price" | "time" | "volume"> {
  prevPrice: number;
}

const TradeItem = (props: TradeItemProps) => {
  const date = props.time;
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const isGreen = Number(props.price) > Number(props.prevPrice);
  const formattedNumber = new Intl.NumberFormat("en-US").format(
    Number(props.price)
  );

  return (
    <div className="flex flex-row w-full items-center px-1 rounded-sm py-1 hover:bg-white/5">
      <p
        className={classNames("text-left w-[33%] text-sm tabular-nums", {
          "text-green-500": isGreen,
          "text-red-500": !isGreen,
        })}
      >
        {formattedNumber}
      </p>
      <p className="text-right w-[33%] text-sm tabular-nums">{props.volume}</p>
      <p className="text-right w-[33%] text-sm tabular-nums text-gray-400">
        {formattedTime}
      </p>
    </div>
  );
};

export default TradeList;
