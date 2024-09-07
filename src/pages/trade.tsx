import { useParams } from "react-router";
import Swap from "../components/trade/Swap";
import MarketBar from "../components/trade/MarketBar";
import Depth from "../components/trade/Depth";
import TradingView from "../components/trade/TradingView";

const Trade = () => {
  const { market } = useParams();

  return (
    <div className="flex flex-col md:flex-row flex-1 h-screen px-6 gap-2">
      <div className="flex flex-col gap-2 flex-1 outline-1 py-4 outline-pink-300">
        <div className="flex flex-row rounded-lg bg-gray-900 w-full">
          <MarketBar market={market as string}></MarketBar>
        </div>

        <div className="flex flex-row flex-1 gap-2 w-full">
          {/* Chart */}
          <TradingView market={market as string}></TradingView>

          {/* OrderBook and Trades */}
          <Depth market={market as string}></Depth>
        </div>
      </div>
      <div className="flex flex-col flex-1 md:flex-none md:w-[250px] overflow-hidden py-4 leading-9">
        <Swap></Swap>
      </div>
    </div>
  );
};

export default Trade;
