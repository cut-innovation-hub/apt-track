import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex shadow bg-blue-900">
      <div className="max-w-7xl w-full mx-auto font-semibold ">
        <div className="flex flex-row items-center h-16 text-sm text-white px-2">
          <Link to="/">
            <p>Logo</p>
          </Link>
          <div className="flex-1 flex flex-col items-center justify-between">
            <div className="md:hidden flex">
              <Link to="/map">
                <p>Locations</p>
              </Link>
            </div>
            <div className="space-x-8 md:flex hidden flex-row items-center">
              <Link to="/">
                <p>Home</p>
              </Link>

              <Link to="/contact">
                <p>Contact Us</p>
              </Link>
              <Link to="/about">
                <p>About</p>
              </Link>
              <Link to="/map">
                <p>Locations</p>
              </Link>
            </div>
          </div>
          <Link to="/login">
            <p className="bg-blue-800 text-white hover:bg-blue-700 rounded-lg py-2 px-4">
              Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
