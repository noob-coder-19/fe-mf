import { Route, Routes } from "react-router";
import "./App.css";
import Trade from "./pages/trade";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Funds from "./pages/funds";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar></Navbar>}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trade/:market" element={<Trade />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
