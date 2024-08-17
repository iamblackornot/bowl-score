import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {LoadingButton} from "@mui/lab";
import {AuthContext} from "../hooks/Auth";
import {Stack, TextField} from "@mui/material";
import ErrorNotification from "../components/ErrorNotification";

export type LoginDialogProps = {
    open: boolean;
    // onConfirm: () => void;
    // onCancel: () => void;
    onClose: () => void;
};

const LoginDialog: React.FC<LoginDialogProps> = (props: LoginDialogProps) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const auth = React.useContext(AuthContext);

    const onLoginClick = async () => {
        const res = await auth.login(username, password);

        if (res) {
            props.onClose();
        }
    };

    return (
        <React.Fragment>
            <Dialog open={props.open} sx={{minWidth: "300px"}}>
                <DialogTitle id="alert-dialog-title" textAlign="center">
                    Log in
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{marginTop: "10px"}}>
                        <TextField
                            required
                            id="outlined-login-input"
                            label="username"
                            value={username}
                            error={auth.error.active}
                            helperText={auth.error.active && auth.error.errorMessage}
                            onChange={(event) => {
                                auth.error.toggleActive(false);
                                setUsername(event.target.value);
                            }}
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="password"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                auth.error.toggleActive(false);
                                setPassword(event.target.value);
                            }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <LoadingButton loading={auth.loading} variant="outlined" autoFocus onClick={props.onClose}>
                        Cancel
                    </LoadingButton>
                    <LoadingButton
                        disabled={!username || !password}
                        loading={auth.loading}
                        variant="contained"
                        onClick={onLoginClick}
                        autoFocus
                    >
                        Proceed
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default LoginDialog;
