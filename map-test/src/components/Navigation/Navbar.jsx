import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        location.pathname === "/"
          ? `${
              scrollPosition > 70 ? "bg-white shadow " : "bg-blue-900 "
            }  z-50  fixed `
          : ` bg-white text-gray-700`
      } w-full flex`}
    >
      <div
        className={` ${location.pathname === '/' ? `${
          scrollPosition > 70 ? "text-gray-700 bg-white " : "text-white "
        }  ` : `text-gray-700 bg-white `} max-w-7xl w-full mx-auto font-semibold `}
      >
        <div className="flex flex-row items-center h-16 text-sm  px-2">
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
            <p
              className={`${location.pathname === '/' ? `${
                scrollPosition > 70
                  ? "bg-blue-900 text-white hover:bg-blue-800 shadow "
                  : "bg-white text-blue-900 hover:bg-blue-100 "
              }  ` : ` bg-blue-900 text-white hover:bg-blue-800 shadow`} rounded-full py-2 px-4`}
            >
              Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
