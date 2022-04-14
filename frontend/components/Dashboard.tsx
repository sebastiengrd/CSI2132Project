import React, { useMemo } from "react";
import { Flex } from "@chakra-ui/react";
import MenuPanel from "./MenuPanel";
import Container from "./Container";
import MenuPanelButton from "./MenuPanelButton";
import theme from "./theme";
import { ReceptionistTabs } from "../pages/receptionist";

const Dashboard = (props: {
    onSelectTab: (id: number) => void,
    selectedTab: ReceptionistTabs,
    menuPanelButtons: String[],
    titles: String[],
    children?: React.ReactNode
}) => {
    const { onSelectTab, selectedTab, menuPanelButtons, titles, children } = props;
    const title = useMemo(() => titles[selectedTab], [selectedTab])

    return (
        <Flex w="100%">
            <Flex
                w="450px"
                minH="100vh"
                background="white"
                border={`solid 1px ${theme.colors.gray[200]}`}
            >
                <MenuPanel h="100%" onSelectTab={id => onSelectTab(id)}>
                    {menuPanelButtons.map((text, index) => <MenuPanelButton key={index}>{text}</MenuPanelButton>)}
                </MenuPanel>
            </Flex>
            <Flex padding="1rem" minH="100vh" w="100%" background="gray.100">
                <Container
                    title={title}
                >
                    {children}
                </Container>
            </Flex>
        </Flex >
    );
}

export default Dashboard;