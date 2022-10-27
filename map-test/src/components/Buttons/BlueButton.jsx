import React from "react";

function BlueButton({ outline, text, onClick, className, loading, text_size }) {
  return (
    <button
      type="button"
      onClick={loading ? () => console.log("loading...") : onClick}
      className={`${className} ${
        outline
          ? "text-blue-900 bg-white border hover:bg-blue-900 hover:text-white"
          : "bg-blue-900 text-white hover:bg-blue-800 "
      } rounded-lg outline-none border-blue-900 w-full`}
    >
      {loading ? (
        <div className="flex flex-row items-center justify-center font-semibold md:p-3 p-2 capitalize">
          <div
            className={`animate-spin rounded-full h-5 w-5 mr-2 border-t-2  border-b-2 ${
              outline ? "border-blue-900 hover:border-white" : "border-white"
            }`}
          ></div>
          <p className="font-semibold capitalize">Loading...</p>
        </div>
      ) : (
        <div
          className={`${
            text_size ? text_size : "text-sm "
          } font-semibold md:p-3 p-2 capitalize text-sm text-center mx-auto flex flex-col items-center`}
        >
          {" "}
          {text}
        </div>
      )}
    </button>
  );
}

export default BlueButton;
