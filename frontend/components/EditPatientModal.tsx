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
import { Patient } from "./hooks/useApi";
import FieldEditor from "./FieldEditor";
import { updatePatient } from "./hooks/useApi"


export type EditPatientModalProps = {
   patient: Patient;
   isOpen: boolean;
   onClose: () => void;
   updatePatients: (patient: Patient) => void;

}

const EditPatientModal = (props: EditPatientModalProps) => {

   const { isOpen, onClose, patient, updatePatients } = props;
   const [isLoading, setIsLoading] = useState(false);
   const [selectedField, setSelectedField] = useState("");
   const [value, setValue] = useState("");
   const [error, setError] = useState("");

   const onSave = async () => {
      setIsLoading(true);
      updatePatient(patient.ssn, selectedField, value)
         .then(success => {
            if (!success) {
               setError("An unexpected error occured.");
               setIsLoading(false);
            } else {
               updatePatients({ ...patient, [selectedField]: value })
               onClose();
            }
         });
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Edit {patient.firstname}'s profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Stack>
                  <Text color="red.500" fontWeight={600}>{error}</Text>
                  <FieldEditor
                     fieldsMap={patient}
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

export default EditPatientModal;