import React from 'react'
import ManageTransactionsTable from '../../../components/Tables/ManageTransactionsTable'
import DashboardLayout from '../../../layouts/DashboardLayout'

function Transactions() {
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full p-8">
        <ManageTransactionsTable />
      </div>
    </DashboardLayout>
  )
}

export default Transactions