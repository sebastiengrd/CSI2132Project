import React from "react";
import { Flex } from "@chakra-ui/react";
import MenuPanel from "./MenuPanel";
import Container from "./Container";
import MenuPanelButton from "./MenuPanelButton";
import theme from "./theme";
import { ReceptionistTabs } from "../pages/receptionist";

const Dashboard = (props: {
    onSelectTab: (id: number) => void,
    selectedTab: ReceptionistTabs,
    children?: React.ReactNode
}) => {
    const { onSelectTab, selectedTab, children } = props;

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
                <Container
                    title={selectedTab === ReceptionistTabs.Employees ? "List of all employees" : "List of all patients"}
                >
                    {children}
                </Container>
            </Flex>
        </Flex >
    );
}

export default Dashboard;