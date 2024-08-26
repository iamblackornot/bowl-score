import * as React from "react";
import Stack from "@mui/material/Stack";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LastPageIcon from "@mui/icons-material/LastPage";

import {IconButton, Typography} from "@mui/material";

export interface CompactPaginationProps {
    pageCount: number;
    page: number;
    onPageChange: (value: number) => void;
}

const CompactPagination: React.FC<CompactPaginationProps> = (props: CompactPaginationProps) => {
    const OnBackward = () => {
        if (props.page > 1) props.onPageChange(props.page - 1);
    };

    const OnForward = () => {
        if (props.page < props.pageCount) props.onPageChange(props.page + 1);
    };

    const OnFullBackward = () => {
        if (props.page > 1) props.onPageChange(1);
    };

    const OnFullForward = () => {
        if (props.page < props.pageCount) props.onPageChange(props.pageCount);
    };

    return (
        <Stack spacing={0.5} direction={"row"} justifyContent="center" alignItems="center" width="100%">
            <IconButton size="large" onClick={OnFullBackward}>
                {" "}
                <FirstPageIcon fontSize="large" />
            </IconButton>
            <IconButton size="large" onClick={OnBackward}>
                {" "}
                <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>
            <Typography variant="h5" sx={{height: "fit-content", minWidth: "4rem", textAlign: "center"}}>
                {props.page}
            </Typography>
            <IconButton size="large" onClick={OnForward}>
                {" "}
                <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
            <IconButton size="large" onClick={OnFullForward}>
                {" "}
                <LastPageIcon fontSize="large" />
            </IconButton>
        </Stack>
    );
};

export default CompactPagination;
