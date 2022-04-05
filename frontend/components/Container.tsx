import React from "react";
import { Heading, Stack } from "@chakra-ui/react";
import theme from "./theme";

const Container = (props: { children?: React.ReactNode }) => {
    const { children } = props;

    return (
        <Stack spacing="2rem" padding="3rem" w="100%" {...props}>
            <Heading size="md">List of all patients</Heading>
            <Stack
                background="white"
                borderRadius="lg"
                border={`solid 1px ${theme.colors.gray[200]}`}
                padding="2rem"
            >
                {children}
            </Stack>
        </Stack>
    );
}

export default Container;