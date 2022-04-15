import React, { useState } from "react";
import { Physician } from "./hooks/useApi";
import { Box, Button, Flex, theme } from "@chakra-ui/react";
import Field from "./Field";

type EmployeeCardProps = {
   employee: Physician;
   onEdit: (employee: Physician) => void;
}

const EmployeeCard = (props: EmployeeCardProps) => {
   const { employee, onEdit } = props;

   return (
      <Flex
         padding="1rem"
         border={`solid 1px ${theme.colors.gray[200]}`}
         borderRadius="lg"
      >
         <Box w="100%">
            <Field name="Employee Id">{employee.employeeid}</Field>
            <Field name="Name">{employee.firstname} {employee.middlename} {employee.lastname}</Field>
            <Field name="Role">{`${employee.emprole}, ${employee.emptype}`}</Field>
            <Field name="Email">{employee.email}</Field>
            <Field name="Phone">{employee.phonenumber}</Field>
            <Field name="Branch">{employee.branchid}</Field>
         </Box>
         <Box>
            <Button onClick={() => onEdit(employee)}>Edit</Button>
         </Box>
      </Flex>
   );
}

export default EmployeeCard;