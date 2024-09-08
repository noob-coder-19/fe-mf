import { formatNumber } from "../../utils/number-utilities";

type Props = {
  bids: [string, string][];
};

export function Bids({ bids }: Props) {
  const cumulative_bids: [string, string, string][] = [];
  let max_size = Number(0);

  const filtered_bids = bids.slice(-15).reverse();
  const total = filtered_bids.reduce((total, bid) => {
    const new_total = formatNumber(total + Number(bid[1]));
    max_size = Math.max(max_size, Number(bid[1]));
    cumulative_bids.push([...bid, new_total.toString()]);

    return new_total;
  }, 0);
  cumulative_bids.reverse();

  return (
    <div className="flex flex-col-reverse flex-1 gap-1">
      {cumulative_bids.map((task, index) => {
        // const key = `bids-${task[0]}-${task[1]}-${task[2]}`;
        const key = `bids-${index}`;
        const bar1 = (Number(task[2]) * 70) / total;
        const bar2 = (Number(task[1]) * 40) / max_size;

        return (
          <BidItem
            individual_bar_width={bar2}
            cumulative_bar_width={bar1}
            key={key}
            bid={task}
          ></BidItem>
        );
      })}
    </div>
  );
}

function BidItem({
  bid,
  cumulative_bar_width,
  individual_bar_width,
}: {
  bid: [string, string, string];
  cumulative_bar_width: number;
  individual_bar_width: number;
}) {
  const formattedBidPrice = new Intl.NumberFormat("en-US").format(
    Number(bid[0])
  );

  return (
    <div className="flex w-full relative overflow-hidden">
      <div
        className="absolute bg-green-500/15 top-0 right-0 h-full transition-all"
        style={{
          width: `${cumulative_bar_width}%`,
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
      <div
        className="absolute bg-green-500/30 top-0 right-0 h-full"
        style={{
          width: `${individual_bar_width}%`,
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
      <div className="flex z-30 h-[25px] w-full flex-row items-center">
        <p className="tabular-nums w-[33%] text-green-500 text-xs">
          {formattedBidPrice}
        </p>
        <p className="tabular-nums w-[33%] text-right text-xs">{bid[1]}</p>
        <p className="tabular-nums w-[33%] text-right text-xs">{bid[2]}</p>
      </div>
    </div>
  );
}
