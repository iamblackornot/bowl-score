"use client";
import React, {useEffect} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

export type AddNewPlayerDialogProps = {
    isOpen: boolean;
    initialValue: string;
    onSubmit: (value: string) => void;
    onClose: () => void;
};

const AddNewPlayerDialog: React.FC<AddNewPlayerDialogProps> = ({
    isOpen,
    initialValue,
    onSubmit,
    onClose,
}: AddNewPlayerDialogProps) => {
    const [value, setValue] = React.useState<string>(initialValue);

    useEffect(() => {
        if (isOpen) {
            setValue(initialValue);
        }
    }, [isOpen, initialValue]);

    const handleClose = () => {
        setValue("");
        onClose();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(value);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Add a new player</DialogTitle>
                <DialogContent>
                    <DialogContentText>Did you miss any film in our list? Please, add it!</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        label="name"
                        type="text"
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddNewPlayerDialog;
