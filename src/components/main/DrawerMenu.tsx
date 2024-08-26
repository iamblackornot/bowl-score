import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import React, {useContext} from "react";

import LiveTvIcon from "@mui/icons-material/LiveTv";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import AccountItem from "./AccoutItem";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import LoginDialog from "../../dialogs/LoginDialog";
import {AuthContext} from "../../hooks/Auth";
import {useNavigate} from "react-router-dom";

const DrawerMenu: React.FC = () => {
    const [loginOpen, setLoginOpen] = React.useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const loginClick = () => {
        auth.isAuthed ? auth.logout : setLoginOpen(true);
    };
    return (
        <>
            <Toolbar />
            <AccountItem />
            <Divider />
            <List>
                <ListItem key="item_live" disablePadding>
                    <ListItemButton onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <LiveTvIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Live"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key="item_results" disablePadding>
                    <ListItemButton onClick={() => navigate("/results")}>
                        <ListItemIcon>
                            <ScoreboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Results"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key="item_login" disablePadding>
                    <ListItemButton onClick={loginClick}>
                        <ListItemIcon>{auth.isAuthed ? <LogoutIcon /> : <LoginIcon />}</ListItemIcon>
                        <ListItemText primary={auth.isAuthed ? "Log out" : "Log in"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
    );
};

export default DrawerMenu;
