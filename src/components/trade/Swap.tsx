import { useState } from "react";
import classNames from "classnames";
import Balance from "./Balance";
import InputWithLabel from "../shared/InputWithLabel";
import useStore from "../../store";
import { useNavigate } from "react-router";

const Swap = () => {
  const { accessToken } = useStore();
  const navigate = useNavigate();
  const [isBuySelected, setIsBuySelected] = useState<boolean>(true);
  const [isLimitOrder, setIsLimitOrder] = useState<boolean>(true);

  const toggleIsBuySelected = (newIsBuySelected?: boolean) => {
    if (newIsBuySelected !== undefined) {
      setIsBuySelected(newIsBuySelected);
      return;
    }

    setIsBuySelected((old) => {
      return !old;
    });
  };

  const toggleIsLimitOrder = (newIsLimitOrder?: boolean) => {
    if (newIsLimitOrder !== undefined) {
      setIsLimitOrder(newIsLimitOrder);
      return;
    }

    setIsLimitOrder((old) => {
      return !old;
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-row h-14">
        <button
          className={classNames("flex-1 border-b-2", {
            "text-green-500 bg-green-500/20 border-green-700 font-medium":
              isBuySelected,
            "border-gray-200 text-gray-200": !isBuySelected,
          })}
          onClick={() => {
            toggleIsBuySelected(true);
          }}
        >
          Buy
        </button>
        <button
          className={classNames("flex-1 border-b-2", {
            "text-red-500 bg-red-500/20 border-red-700 font-medium":
              !isBuySelected,
            "border-gray-200 text-gray-200": isBuySelected,
          })}
          onClick={() => {
            toggleIsBuySelected(false);
          }}
        >
          Sell
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            toggleIsLimitOrder(true);
          }}
          className={classNames(
            "text-center text-sm py-1 px-3 hover:opacity-90 rounded-lg",
            {
              "bg-white/10 font-medium": isLimitOrder,
              "text-gray-400": !isLimitOrder,
            }
          )}
        >
          Limit
        </button>

        <button
          onClick={() => {
            toggleIsLimitOrder(false);
          }}
          className={classNames(
            "text-center text-sm py-1 px-3 hover:opacity-90 rounded-lg",
            {
              "bg-white/10 font-medium": !isLimitOrder,
              "text-gray-400": isLimitOrder,
            }
          )}
        >
          Market
        </button>
      </div>

      <Balance
        buy={isBuySelected}
        currency={isBuySelected ? "USD" : "SOL"}
      ></Balance>

      <div className="mb-2 flex flex-col gap-2">
        {isLimitOrder ? (
          <>
            <InputWithLabel
              label="Price"
              id="limit-price"
              htmlFor="limit-price"
              placeholder="0"
            ></InputWithLabel>
            <InputWithLabel
              label="Quantity"
              id="limit-qty"
              htmlFor="limit-qty"
              placeholder="0"
            ></InputWithLabel>
            <InputWithLabel
              label="Total"
              id="limit-total"
              htmlFor="limit-total"
              placeholder="0"
            ></InputWithLabel>
          </>
        ) : (
          <>
            <InputWithLabel
              label="Quantity"
              id="market-qty"
              htmlFor="market-qty"
              placeholder="0"
            ></InputWithLabel>
          </>
        )}
      </div>

      {/* Buy/Sell Button */}
      {accessToken ? (
        <>
          <button
            className={classNames(
              "text-center w-full text-ebony-950 focus:ring-blue-200 focus:none focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 rounded-lg font-semibold h-12",
              {
                "bg-green-500": isBuySelected,
                "bg-red-500": !isBuySelected,
              }
            )}
          >
            {isBuySelected ? "Buy" : "Sell"}
          </button>
        </>
      ) : (
        <>
          <button
            className={classNames(
              "text-center w-full text-ebony-950 bg-white focus:ring-blue-200 focus:none focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 rounded-lg font-semibold h-12"
            )}
            onClick={() => navigate("/login", { replace: true })}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Swap;
