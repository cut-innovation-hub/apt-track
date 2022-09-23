import React from "react";

function Navbar() {
  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="flex flex-row items-center h-16 text-sm text-gray-700 px-2">
        <p>Name</p>
        <div className="flex-1 flex flex-col items-center justify-between">
          <div className="space-x-8 flex flex-row items-center">
          <p>Home</p>
          <p>About</p>
          <p>Location</p>
          <p>Bus Stops</p>
          </div>
        </div>
        <p className="bg-blue-800 text-white hover:bg-blue-700 rounded-lg py-2 px-4">
          Login
        </p>
      </div>
    </div>
  );
}

export default Navbar;
