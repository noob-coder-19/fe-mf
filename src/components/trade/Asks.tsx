import { formatNumber } from "../../utils/number-utilities";

type Props = {
  asks: [string, string][];
};

export function Asks({ asks }: Props) {
  const filtered_asks = structuredClone(asks.slice(0, 15));

  const cumulative_asks: [string, string, string][] = [];
  let max_size = Number(0);
  const total = filtered_asks.reduce((total, ask) => {
    const new_total = formatNumber(total + Number(ask[1]));
    max_size = Math.max(max_size, Number(ask[1]));
    cumulative_asks.push([...ask, new_total.toString()]);

    return new_total;
  }, 0);

  return (
    <div className="flex flex-col-reverse flex-1 gap-1">
      {cumulative_asks.map((task, index) => {
        const key = `${task[0]}-${index}-${task[1]}-${task[2]}`;
        const bar1 = (Number(task[2]) * 70) / total;
        const bar2 = (Number(task[1]) * 40) / max_size;

        return (
          <AskItem
            key={key}
            ask={task}
            cumulative_bar_width={bar1}
            individual_bar_width={bar2}
          ></AskItem>
        );
      })}
    </div>
  );
}

function AskItem({
  ask,
  cumulative_bar_width = 0,
  individual_bar_width = 0,
}: {
  ask: [string, string, string];
  cumulative_bar_width: number;
  individual_bar_width: number;
}) {
  const formattedAskPrice = new Intl.NumberFormat("en-US").format(
    Number(ask[0])
  );

  return (
    <div className="flex w-full relative overflow-hidden">
      {/* Bars */}
      <>
        {/* Bigger bar */}
        <div
          className="absolute bg-red-500/15 top-0 right-0 h-full"
          style={{
            width: `${cumulative_bar_width}%`,
            transition: "width 0.4s ease-in-out",
          }}
        ></div>

        {/* Smaller bar */}
        <div
          className="absolute bg-red-500/30 top-0 right-0 h-full"
          style={{
            width: `${individual_bar_width}%`,
            transition: "width 0.4s ease-in-out",
          }}
        ></div>
      </>

      {/* Content */}
      <>
        <div className="flex z-30 h-[25px] w-full flex-row items-center">
          <p className="tabular-nums w-[33%] text-red-500 text-xs">
            {formattedAskPrice}
          </p>
          <p className="tabular-nums w-[33%] text-right text-xs">{ask[1]}</p>
          <p className="tabular-nums w-[33%] text-right text-xs">{ask[2]}</p>
        </div>
      </>
    </div>
  );
}
