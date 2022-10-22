import { Avatar } from '@chakra-ui/react'
import { PrinterIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'
import DashboardLayout from '../../../../layouts/DashboardLayout'

function Invoice() {
    const router = useRouter()
    const { id } = router.query
    return (
        <DashboardLayout>
            <div className="flex max-w-7xl mx-auto w-full p-4">
                <div className="flex bg-white flex-col divide-y w-full rounded-2xl md:p-8 p-2">
                    {/* print and cancel buttins */}
                    <div className="flex flex-row items-center justify-between">
                        <p className='text-2xl  font-semibold text-gray-700'>New Receipt</p>
                        <div className="flex space-x-4">
                            <span className='bg-gray-100 p-2 cursor-pointer hover:bg-gray-200 rounded text-sm font-semibold'>
                                Cancel
                            </span>
                            <div className="flex flex-row items-center rounded space-x-1 bg-gray-100 p-2 cursor-pointer hover:bg-gray-200">
                                <PrinterIcon height={16} width={16} />
                                <p className=' rounded text-sm font-semibold'>
                                    Print
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* client and package name */}
                    <div className="border-y grid grid-cols-2 my-8 border-gray-100 py-4 flex flex-row items-center">
                        <div className="col-span-1 flex flex-col space-y-2">
                            <p className='text-sm font-semibold text-gray-700'>Client</p>
                            <div className="flex space-x-2 flex-row items-center">

                                <span><Avatar size={'xs'} name='Zuoci' /></span>
                                <p>Zupco</p>
                            </div>
                        </div>
                        <div className="col-span-1 border-l border-gray-100 pl-4 flex flex-col space-y-2">
                            <p className='text-sm font-semibold text-gray-700'>Package Type</p>
                            <div className="flex space-x-2 flex-row items-center">
                                <p>Blaze extra supreme</p>
                            </div>
                        </div>
                    </div>
                    {/* receipt number  */}
                    <div className="border-y grid grid-cols-2 my-8 border-gray-100 py-4 flex flex-row items-center">
                        <div className="col-span-1 flex flex-col space-y-2">
                            <p className='text-sm font-semibold text-gray-700'>Receipt Number</p>
                            <div className="flex space-x-2 flex-row items-center">

                                <p>{id}</p>
                            </div>
                        </div>

                    </div>
                    {/* receipt number  */}
                    <div className="flex flex-col space-y-4 w-full border-y my-8 border-gray-100 py-4">
                        <div className="grid grid-cols-5 capitalize font-semibold text-gray-700 w-full gap-2">
                            <div className="col-span-2">
                                item name
                            </div>
                            <div className="col-span-1">
                                currency
                            </div>
                            <div className="col-span-1">
                                status
                            </div>
                            <div className="col-span-1">
                                Amount
                            </div>
                        </div>
                        <div className="grid grid-cols-5 capitalize w-full gap-2">
                            <div className="col-span-2">
                                admin subscription to apt-track
                            </div>
                            <div className="col-span-1 uppercase">
                                usd
                            </div>
                            <div className="col-span-1">
                                paid
                            </div>
                            <div className="col-span-1">
                                500
                            </div>
                        </div>
                    </div>

                    {/* sub total lement  */}
                    <div className="flex flex-col space-y-4 w-full border-y my-8 border-gray-100 py-4">
                        <div className="grid grid-cols-5 capitalize font-bold text-gray-900 w-full gap-2">
                           Subtotal
                        </div>
                        <div className="grid grid-cols-5 capitalize w-full gap-2">
                            <div className="col-span-3">
                                USD
                            </div>
                            <div className="col-span-1 uppercase">
                                500
                            </div>
                            <div className="col-span-1">
                                500
                            </div>
                           
                        </div>
                    </div>
                     {/* sub total lement  */}
                     <div className="flex flex-col space-y-4 w-full border-y my-8 border-gray-300 py-4">
                        <div className="grid grid-cols-5 capitalize font-bold text-gray-900 w-full gap-2">
                           Total
                        </div>
                        <div className="grid grid-cols-5 capitalize w-full gap-2">
                            <div className="col-span-4">
                                
                            </div>
                            
                            <div className="col-span-1">
                                500
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Invoice