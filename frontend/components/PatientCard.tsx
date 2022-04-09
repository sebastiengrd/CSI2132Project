import React from "react";
import { Patient } from "./hooks/useApi";
import { Box, Text, theme } from "@chakra-ui/react";

type PatientCardProps = {
   patient: Patient
}

const PatientCard = (props: PatientCardProps) => {
   const { patient } = props;
   
    return (
      <Box
         padding="1rem"
         border={`solid 1px ${theme.colors.gray[300]}`}
         borderRadius="lg"
      >
         <Text>patientid: {patient.patientid}</Text>
         <Text>Name: {patient.patientid}</Text>
         <Text>Birth Date: {patient.patientid}</Text>
         <Text>Sex: {patient.patientid}</Text>
         <Text>Email: {patient.patientid}</Text>
         <Text>Phone: {patient.ssn}</Text>
         <Text>balance: {patient.balance}$</Text>
      </Box>
    );
}

export default PatientCard;