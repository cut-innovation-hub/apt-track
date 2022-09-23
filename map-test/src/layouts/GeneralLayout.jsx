import React from "react";
import Footer from "../components/Navigation/Footer";
import Navbar from "../components/Navigation/Navbar";

function GeneralLayout({ children }) {
  return (
    <div className="flex flex-col w-full">
      <div className="nav">
        <Navbar />
      </div>
      {children}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default GeneralLayout;
