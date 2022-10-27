import React from "react";
import google from "../../assets/svgs/google.svg";

function GoogleButton({onClick}) {

  return (
    <div onClick={onClick} className="grid items-center content-center hover:bg-gray-100 cursor-pointer justify-center p-2 w-full border-2 border-gray-100 rounded-lg">
      <div className="flex flex-row items-center space-x-4">
        <img src={google} height={20} width={20} alt="google svg icon " />
        <p className="text-gray-800 text-lg font-semibold">Google</p>
      </div>
    </div>
  );
}

export default GoogleButton;
