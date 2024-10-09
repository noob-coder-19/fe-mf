import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function CatchAll() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/trade/${import.meta.env.VITE_CORE_MARKET}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- check only once
  }, []);

  return <div>404 Not Found</div>;
}
