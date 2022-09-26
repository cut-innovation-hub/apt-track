import Link from 'next/link'
import React from 'react'
import AddRouteDrawer from '../../../components/Drawers/AddRouteDrawer'
import DashboardLayout from '../../../layouts/DashboardLayout'

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
      </div>
    </DashboardLayout>
  )
}

export default BusStops