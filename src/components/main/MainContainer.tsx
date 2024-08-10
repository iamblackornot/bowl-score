import * as React from "react";
import {PropsWithChildren} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {ThemeProvider} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";

import darkTheme from "../../utility/theme";

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

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem key="item_user">
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Guest"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key="item_live" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LiveTvIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Live"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key="item_results" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ScoreboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Results"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key="item_results" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ScoreboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Results"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

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
                        {drawer}
                    </Drawer>
                </ThemeProvider>
            </Box>

            <Box component="main" sx={{flexGrow: 1, p: 3, padding: "0px", height: "100%"}}>
                {props.children}
            </Box>
        </Box>
    );
}
