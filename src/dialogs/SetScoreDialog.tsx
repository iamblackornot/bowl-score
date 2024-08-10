"use client";
import React from "react";
import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ScoreSelect from "../components/scoreboard/ScoreSelect";

export type SetScoreDialogProps = {
    isOpen: boolean;
    values: number[];
    onClose: () => void;
    onValueSelected: (value: number) => void;
};

const SetScoreDialog: React.FC<SetScoreDialogProps> = (props: SetScoreDialogProps) => {
    const onValueSelected = (value: number) => {
        props.onClose();
        props.onValueSelected(value);
    };

    return (
        <Dialog open={props.isOpen} onClose={() => props.onClose()}>
            <DialogTitle>Set score</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => props.onClose()}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <ScoreSelect values={props.values} onValueSelected={onValueSelected} />
            </DialogContent>
        </Dialog>
    );
};

export default SetScoreDialog;
