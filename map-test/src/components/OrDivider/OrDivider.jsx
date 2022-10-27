import { Divider } from '@chakra-ui/react'
import React from 'react'

function OrDivider() {
  return (
    <div className='flex space-x-4 w-full flex-row items-center'>
        <Divider borderColor={'gray.300'} />
        <p className='font-semibold'>Or</p>
        <Divider borderColor={'gray.300'} />
    </div>
  )
}

export default OrDivider