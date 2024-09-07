import { useEffect, useState } from "react";

type Props = {
  currency: string;
  buy: boolean;
};

type AvailableBalanceType = {
  buy: number;
  sell: number;
};

const Balance = (props: Props) => {
  const [balance, setBalance] = useState<AvailableBalanceType>({
    buy: 0.0,
    sell: 0.0,
  });

  const currency = props.buy ? "USDC" : "SOL";
  const availableBalance = props.buy ? balance.buy : balance.sell;

  useEffect(() => {
    const fetchBalance = async (): Promise<AvailableBalanceType> => {
      return new Promise((resolve) => {
        setTimeout(
          () =>
            resolve({
              buy: 103.0001,
              sell: 2.034751,
            }),
          1000
        );
      });
    };

    fetchBalance().then((balance) => {
      setBalance(balance);
    });
  }, []);

  return (
    <div className="flex flex-row text-xs items-center justify-between">
      <p className="text-gray-400">Available Balance:</p>
      <p className="font-semibold">
        {availableBalance} {currency}
      </p>
    </div>
  );
};

export default Balance;
