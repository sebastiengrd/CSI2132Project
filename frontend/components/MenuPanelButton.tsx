import React from "react";
import { Button } from "@chakra-ui/react";
import theme from "./theme";

const focusColors = {
    blue: theme.colors.blue[500],
    gray: theme.colors.gray[100]
}

type MenuPanelButtonProps = {
    isSelected?: boolean;
    onClick?: () => void;
}

const MenuPanelButton = (props: { children?: React.ReactNode } & MenuPanelButtonProps) => {
    const { isSelected, onClick, children } = props;

    return (
        <Button
            variant="ghost"
            minW="none"
            color={isSelected ? focusColors.blue : "black"}
            background={isSelected ? focusColors.gray : "none"}
            onClick={onClick}
        >
            {children}
        </Button>);

}

export default MenuPanelButton;