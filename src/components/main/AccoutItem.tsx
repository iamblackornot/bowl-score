import {List, ListItem, ListItemIcon, ListItemText, Skeleton, Stack} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, {useContext} from "react";
import {AuthContext} from "../../hooks/Auth";

const AccountItem: React.FC = () => {
    // const loading = true;
    // const loading = false;
    const auth = useContext(AuthContext);

    return (
        <List>
            <ListItem key="item_user">
                {auth.loading && (
                    <Stack direction="row" spacing={4} alignItems="center">
                        <Skeleton animation="wave" variant="circular" width={24} height={24} />
                        <Skeleton animation="wave" variant="rectangular" width={100} height={10} />
                    </Stack>
                )}
                {!auth.loading && (
                    <>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={auth.username} />
                    </>
                )}
            </ListItem>
        </List>
    );
};

export default AccountItem;
