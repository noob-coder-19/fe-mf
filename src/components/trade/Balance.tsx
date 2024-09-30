import classNames from "classnames";
import { ICONS } from "../../utils/icons";

type Props = {
  balance: number;
  currency: string;
  buy: boolean;
  loading: boolean;
  refreshBalance: () => void;
};

const Balance = (props: Props) => {
  return (
    <div className="flex flex-row text-xs items-center justify-between">
      <p className="text-gray-400">Available Balance:</p>

      <div className="flex flex-row items-center gap-2">
        <p className="font-semibold">
          {props.balance} {props.currency}
        </p>

        <button
          disabled={props.loading}
          onClick={() => {
            console.log("refreshing balance");
            props.refreshBalance();
          }}
          className={classNames(`${ICONS.loading}`, {
            "animate-spin": props.loading,
          })}
        ></button>
      </div>
    </div>
  );
};

export default Balance;
