import React from "react";
import { Flex, Box } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import HeaderComponent from "../Header"
import FooterComponent from "../Footer"
import "./layout.css";

const LayoutComponent: React.FC = (props) => {
    const location = useLocation();

    return (
        <>
            <Box display={"table"} height="100%" width="100%">
                <HeaderComponent></HeaderComponent>
                <Box
                    display={"table-row"}
                    width="100%"
                    height={"100%"}
                >
                    <Box paddingBottom={"20px"}>
                        {props.children}
                    </Box>
                </Box>
                <FooterComponent></FooterComponent>
            </Box>
        </>
    )
};

export default LayoutComponent;