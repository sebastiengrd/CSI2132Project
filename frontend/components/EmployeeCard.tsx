import React, { useState } from "react";
import { Physician } from "./hooks/useApi";
import { Box, Button, Flex, Text, theme } from "@chakra-ui/react";
import Field from "./Field";

type EmployeeCardProps = {
   employee: Physician
}

const EmployeeCard = (props: EmployeeCardProps) => {
   const { employee } = props;
   const [isButtonVisible, setIsButtonVisible] = useState(false);
   
    return (
      <Flex
         padding="1rem"
         border={`solid 1px ${theme.colors.gray[300]}`}
         borderRadius="lg"
         onMouseOver={() => setIsButtonVisible(true)}
         onMouseLeave={() => setIsButtonVisible(false)}
      >
         <Box w="100%">
            <Field name="Employee Id">{employee.employeeid}</Field>
            <Field name="Name">{employee.firstname} {employee.middlename} {employee.lastname}</Field>
            <Field name="Role">{employee.emprole}</Field>
            <Field name="Email">{employee.email}</Field>
            <Field name="Phone">{employee.phonenumber}</Field>
         </Box>
         <Box>
            <Button opacity={isButtonVisible ? 1 : 0}>Edit</Button>
         </Box>
      </Flex>
    );
}

export default EmployeeCard;