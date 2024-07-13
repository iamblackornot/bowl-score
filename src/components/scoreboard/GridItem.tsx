import * as React from "react";
import {Box, Typography, useMediaQuery} from "@mui/material";
import {styled} from "@mui/material/styles";
import {blue} from "@mui/material/colors";

const addVerticalTextOrientation = (style: object) => {
    return {...style, writingMode: "vertical-rl", maxHeight: "12.5rem", textAlight: "start"};
};

export const GridItem = styled(Box)(({theme}) => {
    const isSmallScreen = useMediaQuery("(max-width:420px)");
    return {
        backgroundColor: "#fff",
        padding: theme.spacing(isSmallScreen ? 0.5 : 1),
        // padding: theme.spacing(0.5),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        justifyContent: "center",
    };
});

export type TextItemProps = {
    text: string;
};

export const TeamHeader: React.FC<TextItemProps> = (props: TextItemProps) => {
    return (
        <GridItem sx={{backgroundColor: blue[400], color: "#fff", height: "fit-content"}}>
            <Typography variant="h5">{props.text}</Typography>
        </GridItem>
    );
};

export const PlayerItem: React.FC<TextItemProps> = (props: TextItemProps) => {
    const styles = {
        maxHeight: "1.75rem",
        overflow: "hidden",
        whiteSpace: "nowrap",
        height: "100%",
    };

    const isSmallScreen = useMediaQuery("(max-width:420px)");

    return (
        <GridItem>
            <Typography sx={isSmallScreen ? addVerticalTextOrientation(styles) : styles} variant="h6">
                {props.text}
            </Typography>
        </GridItem>
    );
};

export type ScoreItemProps = {
    end: number;
    value: number;
};

export const ScoreItem: React.FC<ScoreItemProps> = (props: ScoreItemProps) => {
    return (
        // <GridItem sx={{backgroundColor: props.end % 2 ? blueGrey[100] : blueGrey[50]}}>
        // <GridItem sx={{backgroundColor: props.end % 2 ? blue[50] : blue[100]}}>
        // <GridItem sx={{backgroundColor: props.end % 2 ? "#e5f7ff" : "#f0f0f0", maxWidth: "3rem"}}>
        <GridItem sx={{backgroundColor: props.end % 2 ? "#e5f7ff" : "#f0f0f0"}}>
            <Typography variant="h4">{props.value}</Typography>
        </GridItem>
    );
};

// export const TransparentItem: React.FC = () => {
//     return <GridItem sx={{width: "6rem", opacity: "0"}}></GridItem>;
// };

export type EndItemProps = {
    end: number;
};

export const EndItem: React.FC<TextItemProps> = (props: TextItemProps) => {
    return (
        // <GridItem sx={{backgroundColor: blue[400], color: "#fff", width: "6rem"}}>
        <GridItem sx={{backgroundColor: blue[400], color: "#fff", height: {}, width: "fit-content"}}>
            <Typography variant="h6">{props.text}</Typography>
        </GridItem>
    );
};

export const TransparentItem: React.FC = () => {
    return (
        <GridItem sx={{opacity: "0", display: "flex", padding: "0"}}>
            <EndItem text="0"></EndItem>
        </GridItem>
    );
};
