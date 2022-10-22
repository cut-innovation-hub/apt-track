import React from 'react'
import ManageDriversTable from '../../../components/Tables/ManageDriversTable'
import DashboardLayout from '../../../layouts/DashboardLayout'
import AddDriverRoute from '../../../components/Drawers/AddDriverDrawer'

function Drivers() {
  return (
    <DashboardLayout>
       <div className="flex flex-col w-full p-8">
        <div className="flex  flex-col ml-auto pb-8">
          <span>
            <>
              <AddDriverRoute />
            </>
          </span>
        </div>
        <ManageDriversTable />
      </div>
    </DashboardLayout>
  )
}

export default Drivers