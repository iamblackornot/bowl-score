import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export interface SimpleModalProps {
    open: boolean;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const SimpleModal: React.FC<React.PropsWithChildren<SimpleModalProps>> = (
    props: React.PropsWithChildren<SimpleModalProps>
) => {
    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{minWidth: "300px"}}
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent dividers> {props.children}</DialogContent>
                <DialogActions>
                    <Button variant="outlined" autoFocus onClick={props.onCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={props.onConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default SimpleModal;
