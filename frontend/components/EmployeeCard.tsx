import React from "react";
import { Physician } from "./hooks/useApi";
import { Box, Text, theme } from "@chakra-ui/react";

type EmployeeCardProps = {
   employee: Physician
}

const EmployeeCard = (props: EmployeeCardProps) => {
   const { employee } = props;
   
    return (
      <Box
         padding="1rem"
         border={`solid 1px ${theme.colors.gray[300]}`}
         borderRadius="lg"
      >
         <Text>Employeeid: {employee.employeeid}</Text>
         <Text>Name: {employee.firstname} {employee.middlename} {employee.lastname}</Text>
         <Text>Role: {employee.emprole}</Text>
         <Text>Email: {employee.email}</Text>
         <Text>Phone: {employee.phonenumber}</Text>
      </Box>
    );
}

export default EmployeeCard;