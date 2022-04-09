import React from "react";
import { Text } from "@chakra-ui/react";

type FieldProps = {
   name: string,
   children?: React.ReactNode
}

const Field = (props: FieldProps) => {
   const { name, children } = props;

   return <Text><b>{name}:</b> {children}</Text>
}

export default Field;
