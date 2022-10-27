import React, { useState } from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import moment from "moment";
import { detectCardType } from "../../utils/detectCardType";
import { BadgeCheckIcon, BookmarkIcon } from "@heroicons/react/solid";
import {
  CalendarIcon,
  CreditCardIcon,
  IdentificationIcon,
  UserIcon,
  WifiIcon,
} from "@heroicons/react/outline";
import { CreditCardIcon as SolidCreditCardcon } from "@heroicons/react/solid";
import visa_logo from "../../assets/svgs/visa.svg";
import mastercard_logo from "../../assets/svgs/mastercard.svg";
import { Divider } from "@chakra-ui/react";

function Payment() {
  // get current date info
  var date = moment();
  var currentDate = date.format("D/MM/YY");
  var res = currentDate.split("/");
  const day = res[0];
  const month = res[1];
  const year = res[2];

  // field inputs
  const [card_number, setCardNumber] = useState(0);
  const [typeDetected, setTypeDetected] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    const max = 1000;
    const maxLength = max.toString().length - 1;
    const newVal =
      val < max ? val : parseInt(val.toString().substring(0, maxLength));
    // setState, etc.
  };

  return (
    <GeneralLayout>
      <div className="flex flex-row items-center w-full flex-1 mx-auto max-w-7xl px-2 py-24">
        <div className="flex flex-row w-full space-x-24">
          <div className="w-2/3 flex flex-col space-y-8">
            <div className="flex flex-row items-center w-full justify-between">
              <p>Apt-Track</p>
              <div className="flex flex-row items-center text-sm font-semibold space-x-2">
                <p className="bg-blue-900 text-white p-1 rounded">{day}</p>
                <p>-</p>
                <p className="bg-blue-900 text-white p-1 rounded">{month}</p>
                <p>-</p>
                <p className="bg-blue-900 text-white p-1 rounded">{year}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-4 w-full items-start justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-700">
                  Card Number
                </p>
                <p className="text-gray-400 text-xs">
                  Enter the 16-digit card number
                </p>
              </div>
              <div className="flex flex-row space-x-4 w-full items-center p-3 border-2 border-gray-200 rounded-lg">
                <div className="flex">
                  {typeDetected === "visa" || typeDetected === "mastercard" ? (
                    <div className="flex">
                      {typeDetected === "visa" ? (
                        <img src={visa_logo} height={30} width={30} />
                      ) : (
                        <img src={mastercard_logo} height={30} width={30} />
                      )}
                    </div>
                  ) : (
                    <CreditCardIcon
                      className="text-gray-300"
                      height={20}
                      width={20}
                    />
                  )}
                </div>
                <input
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                    const valid = detectCardType(e.target.value);
                    setTypeDetected(valid);
                  }}
                  type="number"
                  value={card_number}
                  placeholder="4444 4444 4444 4444"
                  className="w-full outline-none border-none text-lg"
                />
                <span
                  className={`${
                    card_number.length === 16
                      ? "text-blue-700"
                      : "text-gray-300"
                  } `}
                >
                  <BadgeCheckIcon height={20} width={20} />
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="font-semibold text-gray-700">CVV Number</p>
                <p className="text-gray-400 text-xs">
                  Enter the 3 digit number on ther card
                </p>
              </div>
              <div className="flex flex-row items-center p-3 border-2 rounded-lg border-gray-200">
                <div className="flex-1"></div>
                <input
                  maxLength={3}
                  placeholder="000"
                  className="outline-none border-none"
                />
                <IdentificationIcon
                  height={20}
                  width={20}
                  className="text-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="font-semibold text-gray-700">Expiry Date</p>
                <p className="text-gray-400 text-xs">
                  Enter the expiration date on the card
                </p>
              </div>
              <div className="flex flex-row items-center p-3 border-2 rounded-lg border-gray-200">
                <div className="flex-1"></div>
                <input
                  maxLength={3}
                  placeholder="12 / 22"
                  className="outline-none border-none"
                />
                <CalendarIcon
                  height={20}
                  width={20}
                  className="text-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="font-semibold text-gray-700">Password</p>
                <p className="text-gray-400 text-xs">
                  Enter your account password for security reasons
                </p>
              </div>
              <div className="flex flex-row items-center p-3 border-2 rounded-lg border-gray-200">
                <input
                  placeholder="******"
                  className="outline-none border-none"
                />
                <UserIcon height={20} width={20} className="text-gray-500" />
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-row justify-between w-full flex-1">
                <span className="text-white bg-blue-900 hover:bg-blue-800 cursor-pointer rounded-lg p-4 w-full text-center">
                  Pay Now
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col mx-4 pt-16">
            <div className="bg-gray-100 rounded-xl p-8 relative pt-52">
              <div className="absolute bg-white shadow -top-16 rounded-xl mx-auto p-8 ml-auto mr-auto left-0 right-0 w-56">
                  <div className="z-0 absolute border-2 -top-1 border-blue-900 w-20 ml-auto mr-auto left-0 right-0"></div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex">
                    <SolidCreditCardcon
                      height={20}
                      width={20}
                      className="text-yellow-600"
                    />
                  </div>
                  <div className="flex">
                    <WifiIcon
                      height={20}
                      width={20}
                      className="text-gray-700"
                    />
                  </div>
                </div>

                <div className="mt-16"></div>
                <div className="flex flex-col space-y-2">
                  <p className="text-gray-700 text-xs font-semibold capitalize">
                    Tatenda Bako
                  </p>
                  <p className="text-gray-700 font-semibold capitalize">
                    **** 4444
                  </p>
                  <div className="flex flex-row items-center justify-between">
                    <span className="font-bold text-gray-700">22/12</span>
                    <div className="flex">
                      {typeDetected === "visa" ||
                      typeDetected === "mastercard" ? (
                        <div className="flex">
                          {typeDetected === "visa" ? (
                            <img src={visa_logo} height={50} width={50} />
                          ) : (
                            <img src={mastercard_logo} height={50} width={50} />
                          )}
                        </div>
                      ) : (
                        <CreditCardIcon
                          className="text-gray-300"
                          height={20}
                          width={20}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full space-y-2">
                <div className="flex flex-row text-sm items-center justify-between">
                  <p className="text-gray-500">Company Name</p>
                  <p className="text-gray-700 font-semibold ">Zupco</p>
                </div>
                <div className="flex flex-row text-sm items-center justify-between">
                  <p className="text-gray-500">Order Number</p>
                  <p className="text-gray-700 font-semibold ">12123</p>
                </div>
                <div className="flex flex-row text-sm items-center justify-between">
                  <p className="text-gray-500">Subscription</p>
                  <p className="text-gray-700 font-semibold ">
                    Premium Package
                  </p>
                </div>
                <div className="flex flex-row text-sm items-center justify-between">
                  <p className="text-gray-500">VAT (20%)</p>
                  <p className="text-gray-700 font-semibold ">$19</p>
                </div>

                <div className="flex flex-row items-center pt-8 space-x-4">
                  <div className="absolute p-2 rounded-full -left-5 bg-white">
                    <CreditCardIcon
                      className="text-white"
                      height={20}
                      width={20}
                    />
                  </div>
                  <Divider
                    size={"lg"}
                    variant={"dashed"}
                    borderColor={"gray.400"}
                  />
                  <div className="absolute p-2 rounded-full -right-5 bg-white">
                    <CreditCardIcon
                      className="text-white"
                      height={20}
                      width={20}
                    />
                  </div>
                </div>

                <div className="flex pt-8 flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-400">You have to pay</p>
                    <p className="text-lg font-semibold text-gray-800">
                      400. <span className="text-xs">00</span>{" "}
                      <span className="uppercase text-gray-400 teext-xs">
                        usd
                      </span>
                    </p>
                  </div>
                  <div className="flex">
                    <BookmarkIcon
                      height={20}
                      width={20}
                      className="text-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
}

export default Payment;
