import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./pages/Payment/Payment";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Contact from "./pages/Contact";
import MapPage from "./pages/MapPage";
import Home from "../src/pages/Home";
import About from "./pages/About";
import Account from "./pages/AccoountPages/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
