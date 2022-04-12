import React from "react";
import { Heading, Stack } from "@chakra-ui/react";
import theme from "./theme";

const Container = (props: { title: String, children?: React.ReactNode }) => {
    const { children, title } = props;

    return (
        <Stack spacing="2rem" padding="3rem" w="100%">
            <Heading size="md">{title}</Heading>
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