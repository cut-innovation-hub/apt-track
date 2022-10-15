import Link from 'next/link'
import React, { useContext } from 'react'
import AddRouteDrawer from '../../../components/Drawers/AddRouteDrawer'
import ManageRoutesTable from '../../../components/Tables/ManageRoutesTable'
import { Store } from '../../../context/Store'
import { useAuthFetch } from '../../../hooks/useAuthFetch'
import { useFetch } from '../../../hooks/useFetch'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { apiUrl } from '../../../utils/apiUrl'

type Props = {}

const BusStops = (props: Props) => {
  return (
    <DashboardLayout>
     <div className="flex flex-col w-full p-8">
        <div className="flex  flex-row items-center w-full  pb-8">
          <p className='flex-1 text-lg font-semibold'>Manage Routes</p>
          <Link href={"/dashboard/buses/create"} passHref>
            <AddRouteDrawer />
          </Link>
        </div>
        <>
          <ManageRoutesTable />
        </>
      </div>
    </DashboardLayout>
  )
}

export default BusStops