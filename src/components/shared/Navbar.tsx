import { Outlet, useNavigate } from "react-router";
import useStore from "../../store";
import { Logo } from "./Logo";

const Navbar = () => {
  const { accessToken } = useStore();
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar z-40 bg-ebony-950 flex justify-between items-center sticky top-0 left-0 w-full h-16 outline outline-1 outline-gray-700 px-6">
        <div className="navbar-logo">
          <Logo></Logo>
        </div>

        <div className="flex flex-row items-center justify-between gap-4">
          {accessToken === null ? (
            <>
              <button
                type="button"
                className="text-center text-yellow-300 bg-yellow-300/20 font-semibold rounded-lg focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 text-sm px-3 py-1.5"
                onClick={() => navigate("/register", { replace: true })}
              >
                Signup
              </button>

              <button
                type="button"
                className="text-center text-heliotrope-400 bg-heliotrope-400/20 font-semibold rounded-lg focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 text-sm px-3 py-1.5"
                onClick={() => navigate("/login", { replace: true })}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="text-center text-green-500 bg-green-500/20 font-semibold rounded-lg focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 text-sm px-3 py-1.5"
              >
                Deposit
              </button>

              <button
                type="button"
                className="text-center text-blue-500 bg-blue-500/20 font-semibold rounded-lg focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 text-sm px-3 py-1.5"
              >
                Withdraw
              </button>

              <button
                type="button"
                className="text-center text-purple-400 bg-purple-500/20 font-semibold rounded-lg focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 text-sm px-3 py-1.5"
              >
                Profile
              </button>

              <button
                type="button"
                className="text-center text-orange-500 bg-orange-500/20 font-semibold rounded-lg focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 text-sm px-3 py-1.5"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <Outlet></Outlet>
    </>
  );
};

export default Navbar;
