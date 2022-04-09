import React from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
} from "@chakra-ui/react";
import { Patient } from "./hooks/useApi";

export type EditPatientModalProps = {
   patient: Patient;
   isOpen: boolean;
   onClose: () => void;
}

const EditPatientModal = (props: EditPatientModalProps) => {
   const { isOpen, onClose } = props;

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               Yo
            </ModalBody>

            <ModalFooter>
               <Button variant='ghost' mr={3} onClick={onClose}>Close</Button>
               <Button colorScheme='blue'>
                  Save
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
  )
}

export default EditPatientModal;