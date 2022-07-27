import type { NextPage } from 'next'
import DashboardCard from '../components/DashboardCard/DashboardCard'
import DashboardLayout from '../layouts/DashboardLayout'
import {
  ScaleIcon,
  PencilIcon,
  ArchiveIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  CogIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import { Avatar } from '@chakra-ui/react'
import { useContext } from 'react'
import { Store } from '../context/Store'
import BlueButton from '../components/Buttons/BlueButton'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { state } = useContext(Store);
  const { cut_buses_Admin_User } = state;
  const history = useRouter()

  console.log(cut_buses_Admin_User)

  // gettign todats data
  var today = new Date()
  var curHr = today.getHours()
  return (
   <DashboardLayout>
      <main className="relative z-0 flex-1 overflow-y-auto pb-8">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="min-w-0 flex-1">
                {/* Profile */}
                <div className="flex items-center">
                  <div className="hidden rounded-full sm:block">
                    <Avatar
                      size="lg"
                      src={cut_buses_Admin_User?.photoURL}
                      name={cut_buses_Admin_User?.name}
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="rounded-full sm:hidden">
                        <Avatar
                          size="lg"
                          src={cut_buses_Admin_User?.photoURL}
                          name={cut_buses_Admin_User?.name}
                        />
                      </div>
                      <div className="flex flex-col ml-3">
                        <h1 className=" md:text-2xl text-xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                          Good{' '}
                          {curHr < 12
                            ? ' Morning'
                            : curHr < 18
                            ? ' Afternoon '
                            : 'Evening'}
                          , {cut_buses_Admin_User?.name}
                        </h1>
                        <dl className=" flex flex-col sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Account status</dt>
                          {cut_buses_Admin_User?.verified ? (
                            <dd className=" flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                              <CheckCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                                aria-hidden="true"
                              />
                              Verified account
                            </dd>
                          ) : (
                            <dd className=" flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                              <CheckCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              Account not verified
                            </dd>
                          )}
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <div className="mr-2 flex">
                  {cut_buses_Admin_User?.role === 'user' ? (
                    <BlueButton
                      text="Add Bus"
                      outline
                      onClick={() =>
                        history.push(
                          '/login?redirect=/dashboard/buses/add'
                        )
                      }
                    />
                  ) : (
                    <BlueButton
                      text="Add Bus"
                      outline
                      onClick={() =>
                        history.push('/dashboard/buses/add')
                      }
                    />
                  )}
                </div>
                <div className="flex">
                  <BlueButton
                    text="Manage Buses"
                    onClick={() => history.push('/dashboard/buses')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              <DashboardCard
                name="Account balance"
                icon={
                  <ScaleIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                }
                location="dashboard/reports"
                amount={0}
                loading={false}
                bg_color={'bg-red-200'}
              />
              <DashboardCard
                name="Manage Buses"
                icon={
                  <PencilIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                }
                location="/dashboard/buses"
                amount={0}
                loading={false}
                bg_color={'bg-green-200'}
              />
              <DashboardCard
                icon={
                  <ArchiveIcon
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                }
                name="Manage Drivers"
                location="/dashboard/drivers"
                amount={0}
                loading={false}
                bg_color="bg-blue-200"
              />
              <DashboardCard
                icon={
                  <CreditCardIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                }
                name="Cards & Payments"
                location="/dashboard/cards"
                amount={0}
                loading={false}
                bg_color="bg-indigo-200"
              />
              <DashboardCard
                icon={
                  <ShoppingBagIcon
                    className="h-6 w-6 text-cyan-600"
                    aria-hidden="true"
                  />
                }
                name="eports"
                location="/dashboard/reports"
                amount={0}
                loading={false}
                bg_color="bg-cyan-200"
              />
              <DashboardCard
                icon={
                  <CogIcon
                    className="h-6 w-6 text-gray-600"
                    aria-hidden="true"
                  />
                }
                name="Settings"
                location="/dashboard/settings"
                amount={'store settings'}
                loading={false}
                bg_color="bg-gray-200"
              />
            </div>
          </div>
        </div>
      </main>
   </DashboardLayout>
  )
}

export default Home
