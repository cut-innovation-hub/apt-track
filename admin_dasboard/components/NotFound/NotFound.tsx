import Image from "next/image";
import React from "react";
import not_found from "../../public/svgs/not_found.svg";

type Props = {};

function NotFound({}: Props) {
  return (
    <div className="text-center flex flex-col item-center text-gray-700 w-full flex-1 capitalize">
      <Image src={not_found} height={80} width={80} />
      <p>No Items Found</p>
    </div>
  );
}

export default NotFound;
