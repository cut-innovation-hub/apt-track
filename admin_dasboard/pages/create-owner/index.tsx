import React, { useState } from "react";

function CreateOwner() {
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [phone_number2, setPhoneNumber2] = useState("");
  const [notification_type, setNotificationType] = useState("");
  return (
    <div className="flex flex-col max-w-7xl py-16 mx-auto bg-white px-4">
      <div className="grid grid-cols-5 gap-8">
        <p className="text-gray-800 col-span-5 text-center capitalize font-semibold md:text-3xl text-lg">
          Please enter the following details first before you proceed to the
          dashboard
        </p>
        <div className="flex flex-col md:col-span-3 col-span-6 pt-8">
          <label
            htmlFor="phone-number"
            className=" flex-1 text-sm text-gray-600 pb-1 font-semibold"
          >
            Phone Number <span className="text-red-600">*</span>{" "}
            <span className="font-medium">(required)</span>
          </label>
          <input
            id="phone-number"
            className="border flex-1 w-full border-gray-200 rounded p-2 outline-none"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="flex flex-col md:col-span-3 col-span-6">
          <label
            htmlFor="phone-number"
            className=" flex-1 text-sm text-gray-600 pb-1 font-semibold"
          >
            Phone Number 2 <span className="font-medium">(optional)</span>
          </label>
          <input
            id="phone-number"
            className="border flex-1 w-full border-gray-200 rounded p-2 outline-none"
            type="text"
            onChange={(e) => setPhoneNumber2(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="flex flex-col md:col-span-3 col-span-6">
          <label
            htmlFor="phone-number"
            className=" flex-1 text-sm text-gray-600 pb-1 font-semibold"
          >
            Email <span className="text-red-600">*</span>{" "}
            <span className="font-medium">(required)</span>
          </label>
          <input
            id="email"
            className="border flex-1 w-full border-gray-200 rounded p-2 outline-none"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your contact email"
          />
        </div>

        <fieldset className="col-span-5">
          <legend className="block text-sm font-semibold text-gray-700">
            How do you expect to receive information
          </legend>
          <div className="mt-4 grid grid-cols-1 gap-y-4">
            <div className="flex items-center">
              <input
                id="email"
                name="budget"
                defaultValue="email"
                onChange={(e) => setNotificationType("email")}
                type="radio"
                className="focus:ring-grape-500 h-4 w-4 text-grape-600 border-gray-300"
              />
              <label htmlFor="budget-under-25k" className="ml-3">
                <span className="block text-sm text-gray-500">
                  Through Our Email
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="texts"
                name="budget"
                defaultValue="texts"
                onChange={(e) => setNotificationType("texts")}
                type="radio"
                className="focus:ring-grape-500 h-4 w-4 text-grape-600 border-gray-300"
              />
              <label htmlFor="budget-25k-50k" className="ml-3">
                <span className="block text-sm text-gray-500">Through Texts</span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-notifications"
                name="budget"
                defaultValue="under-3000"
                onChange={(e) => setNotificationType("push-notifications")}
                type="radio"
                className="focus:ring-grape-500 h-4 w-4 text-grape-600 border-gray-300"
              />
              <label htmlFor="budget-under-3000" className="ml-3">
                <span className="block text-sm text-gray-500">Through push notifications</span>
              </label>
            </div>
          </div>
        </fieldset>

        <div className="col-span-5 mx-auto">
          <div className="flex bg-blue-primary text-white p-2 rounded font-semibold cursor-pointer hover:bg-blue-dark ">
            Save Info
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOwner;