import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src//pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/regsiter" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
