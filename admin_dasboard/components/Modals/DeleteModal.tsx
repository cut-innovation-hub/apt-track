import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/outline";
import React from "react";

type Props = {
  name: string;
  loading: boolean;
  isOpen: any;
  onClose: any;
  onClick: any;
};

function DeleteModal({ name, loading, isOpen, onClose, onClick }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody className="flex w-full  flex-col items-center ">
          <TrashIcon height={80} width={80} className="text-blue-primary " />
          <p className="my-4 text-center text-lg font-semibold text-gray-800">
            Delete
          </p>
          <p className="text-center">
            Are you sure you want to delete {name}?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={onClick} colorScheme="red" isLoading={loading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteModal;
