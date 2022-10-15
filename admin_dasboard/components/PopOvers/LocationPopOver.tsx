import React from 'react'
import {
    // for popover
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    useDisclosure,
    IconButton,
    Box,
  } from "@chakra-ui/react";
import { PencilIcon } from '@heroicons/react/outline';

type Props = {
    onOpen ?:any,
    onClose?:any,
    isOpen?:any
}

const LocationPopOver = ({onOpen, onClose, isOpen}: Props) => {
  const firstFieldRef = React.useRef(null)
  return (
    <>
      <Box display='inline-block' mr={3}>
        John Smith
      </Box>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size='sm' icon={<PencilIcon />} />
        </PopoverTrigger>
        <PopoverContent p={5}>
         <p>Pop Over</p>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default LocationPopOver