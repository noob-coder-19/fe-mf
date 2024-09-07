import classNames from "classnames";
import { Asks } from "./Asks";
import { Bids } from "./Bids";

type Props = {
  price: string;
  hasPriceIncreased: boolean;
  asks: [string, string][];
  bids: [string, string][];
};

function Book({
  asks = [],
  bids = [],
  price,
  hasPriceIncreased = true,
}: Props) {
  return (
    <div className="flex flex-col">
      <Asks asks={asks}></Asks>
      <div
        className={classNames(
          "flex flex-col font-semibold flex-0 snap-center px-3 py-1 text-center",
          {
            "text-green-500": hasPriceIncreased,
            "text-red-500": !hasPriceIncreased,
          }
        )}
      >
        {price}
      </div>
      <Bids bids={bids}></Bids>
    </div>
  );
}

export default Book;
