import React from 'react'
import banner1 from '../../../assets/images/banner1.png'
import {Link} from 'react-router-dom'

function HeroSection() {
  return (
    <>
     <div className="max-w-7xl w-full mx-auto py-16">
        <div className="mx-auto max-w-7xl px-2 ">
          <div className="relative shadow-xl rounded-3xl">
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={banner1}
                alt="People working on laptops"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">
                  Discover transport and bus stops
                </span>
                <span className="block text-indigo-200">
                  travelling has never been easier
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">
                We can help you get where you want with ease. With just a click
                of a button
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                  <div className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-primary shadow-sm hover:bg-indigo-50 sm:px-8">
                    Locate
                  </div>

                  <div>
                    <a className="flex items-center justify-center rounded-md border border-transparent bg-blue-900 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8">
                      I own a vehicle
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-16 left-0 right-0 ml-auto mr-auto w-11/12 z-50">
              <div className="flex flex-row items-center space-x-2 text-sm ml-4">
                <p className="rounded-t bg-white p-2 cursor-pointer">Address</p>
                <Link to='/map' className="rounded-t bg-gray-200 p-2 cursor-pointer">
                  Use Map
                </Link>
              </div>
              <div className="flex flex-col rounded-lg w-full bg-white shadow p-4">
                <div className="flex flex-row">
                  <div className="rounded-full py-4 text-sm text-gray-500">
                    Where do you want to go?
                  </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <div className="flex flex-row items-center rounded overflow-hidden bg-gray-100 p-2 text-sm">
                    <input
                      type="text"
                      placeholder="Enter Departure Address"
                      className="bg-gray-100 outline-none"
                    />
                  </div>
                  <div className="flex flex-row items-center rounded overflow-hidden bg-gray-100 p-2 text-sm">
                    <input
                      type="text"
                      placeholder="Enter Destination Address"
                      className="bg-gray-100 outline-none"
                    />
                  </div>
                  <div className="flex-1" />
                  <div className="flex ">
                    <div className="flex bg-blue-900 text-white text-sm p-2 rounded-lg">
                      Search
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection