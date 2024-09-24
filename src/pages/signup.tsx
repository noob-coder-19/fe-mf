import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getAccessToken, registerController } from "../api/clientFunctions";
import useStore from "../store";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { setAccessToken } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    registerController(email.toString(), password.toString())
      .then((res) => {
        setLoading(false);
        setAccessToken(res);
        navigate(`/login`);
      })
      .catch((err) => {
        console.log(err);
        alert("Error: Some error occurred");
      });
  };

  useEffect(() => {
    getAccessToken().then((response) => {
      setAccessToken(response);
      navigate(`/trade/${import.meta.env.VITE_CORE_MARKET}`, {
        replace: true,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- check only once
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="min-w-[400px] w-2/5 flex flex-col p-6 gap-4 rounded-xl bg-white/10">
        <h1 className="text-center text-4xl">Register</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            autoComplete="email"
            className="px-3 py-2 rounded-md"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />

          {/* Password */}
          <input
            autoComplete="current-password"
            className="px-3 py-2 rounded-md"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />

          <span className="text-right text-sm">
            Already have an account?{" "}
            <Link
              className="font-semibold text-ebony-400 hover:underline"
              to="/login"
            >
              Login
            </Link>
          </span>

          <button
            disabled={loading}
            className="flex-1 p-2 rounded-lg bg-white disabled:bg-white/50 text-black"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
