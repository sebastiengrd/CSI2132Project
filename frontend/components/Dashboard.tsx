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
        <Flex w="100%">
            <Flex
                w="450px"
                minH="100vh"
                background="white"
                border={`solid 1px ${theme.colors.gray[200]}`}
            >
                <MenuPanel h="100%" onSelectTab={id => onSelectTab(id)}>
                    <MenuPanelButton>Patients</MenuPanelButton>
                    <MenuPanelButton>Employees</MenuPanelButton>
                    <MenuPanelButton>Logout</MenuPanelButton>
                </MenuPanel>
            </Flex>
            <Flex padding="1rem" minH="100vh" w="100%" background="gray.100">
                <Container>
                    {children}
                </Container>
            </Flex>
        </Flex >
    );
}

export default Dashboard;