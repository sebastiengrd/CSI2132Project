import React, { useState, useContext, ReactNode } from "react";
import { Heading, Flex, StackProps, Stack } from "@chakra-ui/react";
import { UserContext } from "./contexts/UserContext";

const MenuPanel = (props: { children?: ReactNode } & StackProps) => {
    const { children, ...stackProps } = props;
    const { name } = useContext(UserContext);
    const [selectedPanelButton, setSelectedPanelButton] = useState(0);

    const onMenuPanelButtonClick = (id: number) => setSelectedPanelButton(id);

    const onClick = (id: number) => {
        onMenuPanelButtonClick(id);
    }

    const childrenWithProps = React.Children.map(children, (child, id) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { onClick: () => onClick(id), isSelected: selectedPanelButton === id });
        }
        return child;
    })

    return (
        <Stack spacing='2rem' padding="3rem"  {...stackProps}>
            <Flex>
                <Heading size='lg'>Hi, {name}</Heading>
            </Flex>
            <Stack spacing="0.5rem" alignItems="start">
                {childrenWithProps}
            </Stack>
        </Stack>
    );
}

export default MenuPanel;