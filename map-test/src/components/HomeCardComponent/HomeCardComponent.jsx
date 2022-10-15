import React from 'react'
import {BriefcaseIcon} from '@heroicons/react/outline'

function HomeCardComponent({icon, heading, body}) {
  return (
    <div className='flex flex-col shadow-lg p-4 rounded space-y-4'>
        <div className="flex mt-8">
            {icon}
        </div>
        <p className='text-gray-900 font-bold text-lg'>{heading}</p>
        <div className="flex content-around justify-around text-justify text-gray-500">
            {body}
        </div>
    </div>
  )
}

export default HomeCardComponent