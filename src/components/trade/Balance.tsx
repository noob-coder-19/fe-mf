type Props = {
  balance: number;
  currency: string;
  buy: boolean;
};

const Balance = (props: Props) => {
  return (
    <div className="flex flex-row text-xs items-center justify-between">
      <p className="text-gray-400">Available Balance:</p>
      <p className="font-semibold">
        {props.balance} {props.currency}
      </p>
    </div>
  );
};

export default Balance;
