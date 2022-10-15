import Link from 'next/link'
import React from 'react'
import AddBusStopDrawer from '../../../components/Drawers/AddBusStopDrawer'
import AddRouteDrawer from '../../../components/Drawers/AddRouteDrawer'
import DashboardLayout from '../../../layouts/DashboardLayout'

type Props = {}

function BusStops({}: Props) {
  return (
    <DashboardLayout>
        <div className="flex flex-col w-full max-w-7xl p-8">
        <div className="flex  flex-row items-center w-full  pb-8">
          <p className='flex-1 text-lg font-semibold'>Manage Routes</p>
          <Link href={"/dashboard/buses/create"} passHref>
            <AddBusStopDrawer />
          </Link>
        </div>
        </div>
    </DashboardLayout>
  )
}

export default BusStops