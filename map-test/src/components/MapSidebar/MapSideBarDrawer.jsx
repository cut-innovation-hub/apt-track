import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { MenuAlt3Icon } from "@heroicons/react/outline";
import MapSidebar from "./MapSidebar";

function MapSideBarDrawer({scrollHeight}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <div ref={btnRef} colorScheme="teal" size={'sm'} onClick={onOpen}>
        <MenuAlt3Icon className={`${scrollHeight > 70 ? "text-gray-700 " : "text-white " }`} height={24} width={24} />
      </div>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <MapSidebar />
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MapSideBarDrawer;
