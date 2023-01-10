import { Avatar, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { apiUrl } from "../../../../utils/apiUrl";

type Props = {};

function SingleDriver({}: Props) {
  const router = useRouter();
  const { id } = router.query;
  const url = `${apiUrl}/api/driver/single?driver_id=${id}`
  const driver = useFetch(url)

  const [name, setName] = useState('')
  const [nat_id, setNationalId] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [picture, setPicture] = useState('')

  useEffect(()=>{
    setGender(driver?.data?.driver?.gender)
    setNationalId(driver?.data?.driver?.id_number)
    setPhone(driver?.data?.driver?.phone_number)
    setName(driver?.data?.driver?.name)
    setPicture(driver?.data?.driver?.picture)
  },[driver])


  console.log('driver on driver page', driver)

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full max-w-7xl md:p-16 p-2 mx-auto">
        <div className="flex flex-row items-center space-x-4">
          <Avatar src={picture} name={name} size={"lg"} />
          <div className="flex flex-col">
            <p>{driver?.data?.driver?.name}</p>
            <p>{driver?.data?.driver?.phone_number}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-24">
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor="name"
              className="m-2 text-sm text-gray-700 capitalize"
            >
              name
            </label>
            <input
              type="text"
              placeholder="name"
              defaultValue={name}
              value={name}
              onChange={(e:any) => setName(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 outline-none"
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor="name"
              className="m-2 text-sm text-gray-700 capitalize"
            >
              National Id
            </label>
            <input
              type="text"
              placeholder="Namtional Id"
              defaultValue={nat_id}
              value={nat_id}
              onChange={(e:any) => setNationalId(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 outline-none"
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor="name"
              className="m-2 text-sm text-gray-700 capitalize"
            >
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              defaultValue={phone}
              value={phone}
              onChange={(e:any) => setPhone(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 outline-none"
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor="name"
              className="m-2 text-sm text-gray-700 capitalize"
            >
              Gender
            </label>
            <Select placeholder="Select gender" defaultValue={gender} value={gender} onChange={(e)=> setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>
          <div className="col-span-2 flex flex-col items-center mt-16">
              <span className="bg-blue-900 rounded-lg hover:bg-blue-800 cursor-pointer text-white mx-auto p-2">
              Save Changes
              </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SingleDriver;
