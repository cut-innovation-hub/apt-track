import React from 'react'

const AuthInput = ({ label, placeholder, setValue, value, type }) => {
    return (
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-gray-400 text-lg capitalize">{label}</p>
        <input
          type={`${type ? type : "text"}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-gray-100 w-full outline-none text-gray-500 border border-gray-200 rounded-lg text-lg p-2"
          placeholder={placeholder}
        />
      </div>
    );
  };

export default AuthInput