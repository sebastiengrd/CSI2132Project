import React from "react";
import { Flex } from "@chakra-ui/react";
import MenuPanel from "./MenuPanel";
import Container from "./Container";
import MenuPanelButton from "./MenuPanelButton";
import theme from "./theme";

const Dashboard = (props: { 
    onSelectTab: (id: number) => void;
    children?: React.ReactNode
}) => {
    const { onSelectTab, children } = props;

    return (
        <Flex h="100%" w="100%">
            <Flex
                w="450px"
                h="100%"
                background="white"
                border={`solid 1px ${theme.colors.gray[200]}`}
            >
                <MenuPanel onSelectTab={id => onSelectTab(id)}>
                    <MenuPanelButton>Patients</MenuPanelButton>
                    <MenuPanelButton>Employees</MenuPanelButton>
                    <MenuPanelButton>Logout</MenuPanelButton>
                </MenuPanel>
            </Flex>
            <Flex padding="1rem" h="100%" w="100%" background="gray.100">
                <Container>
                    {children}
                </Container>
            </Flex>
        </Flex >
    );
}

export default Dashboard;