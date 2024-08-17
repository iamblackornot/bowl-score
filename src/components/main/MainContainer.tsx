import * as React from "react";
import {PropsWithChildren} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {ThemeProvider} from "@mui/material";

import darkTheme from "../../utility/theme";
import DrawerMenu from "./DrawerMenu";

const drawerWidth = 200;

interface MainContainerProps {}

export default function MainContainer(props: PropsWithChildren<MainContainerProps>) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    React.useEffect(() => {
        console.log("MainContainer mounted");
        return () => console.log("MainContainer unmounted");
    });

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: {
                    xs: "100vw",
                    sm: "600px",
                },
                height: "100vh",
            }}
        >
            <AppBar position="relative">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}} aria-label="menu options">
                <ThemeProvider theme={darkTheme}>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: {xs: "block"},
                            "& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth},
                        }}
                    >
                        <DrawerMenu />
                    </Drawer>
                </ThemeProvider>
            </Box>

            <Box component="main" sx={{flexGrow: 1, p: 3, padding: "0px", height: "100%"}}>
                {props.children}
            </Box>
        </Box>
    );
}
