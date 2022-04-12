import React, { useState } from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   Stack,
   Text,
} from "@chakra-ui/react";
import { Physician } from "./hooks/useApi";
import FieldEditor from "./FieldEditor";
import { updatePhysician } from "./hooks/useApi"

export type EditEmployeeModalProps = {
   employee: Physician;
   isOpen: boolean;
   onClose: () => void;
   updateEmployees: (employee: Physician) => void;
}

const EditEmployeeModal = (props: EditEmployeeModalProps) => {
   const { isOpen, onClose, employee, updateEmployees } = props;
   const [isLoading, setIsLoading] = useState(false);
   const [selectedField, setSelectedField] = useState("");
   const [value, setValue] = useState("");
   const [error, setError] = useState("");

   const onSave = async () => {
      setIsLoading(true);
      updatePhysician(employee.ssn, selectedField, value)
         .then(success => {
            if (!success) {
               setError("An unexpected error occured.");
               setIsLoading(false);
            } else {
               updateEmployees({ ...employee, [selectedField]: value })
               onClose();
            }
         });
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Edit {employee.firstname}'s profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Stack>
                  <Text color="red.500" fontWeight={600}>{error}</Text>
                  <FieldEditor
                     fieldsMap={employee}
                     value={value}
                     onChangeValue={value => setValue(value)}
                     selectedField={selectedField}
                     onChangeField={field => setSelectedField(field)}
                  />
               </Stack>
            </ModalBody>

            <ModalFooter>
               <Button variant='ghost' mr={3} onClick={onClose}>Close</Button>
               <Button colorScheme='blue' onClick={onSave} isLoading={isLoading}>
                  Save
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}

export default EditEmployeeModal;