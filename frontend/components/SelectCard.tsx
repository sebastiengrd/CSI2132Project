import React, { useState } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import theme from "./theme";

const focusColors = {
    brand: theme.colors.brand[500],
    gray: theme.colors.gray[200]
}

const SelectCard = (props: { children?: React.ReactNode } & FlexProps) => {
    const { children, ...flexProps } = props;
    const [borderColor, setBorderColor] = useState(focusColors.gray)

    const onMouseEnter = () => {
        setBorderColor(focusColors.brand);
    }
    const onMouseLeave = () => {
        setBorderColor(focusColors.gray);
    }

    return (
        <Flex
            padding="2rem"
            shadow="lg"
            borderRadius="lg"
            border={`2px solid ${borderColor}`}
            cursor="pointer"
            transition="all 0.2s ease"
            w="250px"
            h="275px"
            justifyContent="center"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...flexProps}
        >
            {children}
        </Flex>);

}

export default SelectCard;