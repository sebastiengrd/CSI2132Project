import React, { useState } from "react";
import { Patient } from "./hooks/useApi";
import { Box, Button, Flex, theme, Stack } from "@chakra-ui/react";
import Field from "./Field";

type PatientCardProps = {
   patient: Patient
   onEdit: (patient: Patient) => void;
   onBookAppointment: (patient: Patient) => void;
}

const PatientCard = (props: PatientCardProps) => {
   const { patient, onEdit, onBookAppointment } = props;

   return (
      <Flex
         padding="1rem"
         border={`solid 1px ${theme.colors.gray[200]}`}
         borderRadius="lg"
      >
         <Box w="100%">
            <Field name="Patient Id">{patient.patientid}</Field>
            <Field name="Name">{patient.firstname} {patient.middlename} {patient.lastname}</Field>
            <Field name="Birth Date">{patient.dateofbirth}</Field>
            <Field name="Sex">{patient.gender}</Field>
            <Field name="Email">{patient.email}</Field>
            <Field name="Phone">{patient.phonenumber}</Field>
            <Field name="Balance">{patient.balance}$</Field>
         </Box>
         <Stack>
            <Button onClick={() => onEdit(patient)}>Edit</Button>
            <Button onClick={() => onBookAppointment(patient)}>Setup Appointment</Button>
         </Stack>
      </Flex>
   );
}

export default PatientCard;