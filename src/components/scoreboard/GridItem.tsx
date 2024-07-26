import * as React from "react";
import {Box, Typography, useMediaQuery} from "@mui/material";
import {useTheme, styled} from "@mui/material/styles";
import {blue, orange, red} from "@mui/material/colors";
import useMedia from "../../hooks/Media";
import {Theme} from "@mui/material/styles/createTheme";

const addVerticalTextOrientation = (style: object) => {
    return {...style, writingMode: "vertical-rl", maxHeight: "12.5rem", textAlight: "start"};
};

export const GridItem = styled(Box)(({theme}) => {
    return {
        backgroundColor: "#fff",
        padding: theme.spacing(0.5),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
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
        maxHeight: "2rem",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "clip",
        height: "100%",
    };

    const {isSmallScreen} = useMedia();

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
    value?: number | null;
    highlight?: boolean;
    invalid?: boolean;
    onClick?: () => void;
};

const addScoreHightlight = (style: object, theme: Theme) => {
    return {...style, backgroundColor: orange[100], color: theme.palette.text.secondary};
};

const addInvalidScoreHightlight = (style: object, theme: Theme) => {
    return {...style, backgroundColor: red[100], color: theme.palette.text.secondary};
};

export const ScoreItem: React.FC<ScoreItemProps> = (props: ScoreItemProps) => {
    const theme = useTheme();
    let styles = {
        backgroundColor: props.end % 2 ? "#f0f0f0" : "#e5f7ff",
    };

    if (props.highlight) styles = addScoreHightlight(styles, theme);
    else if (props.invalid) styles = addInvalidScoreHightlight(styles, theme);

    return (
        <GridItem sx={styles} onClick={() => props.onClick && props.onClick()}>
            <Typography variant={"h5"}>{props.value ?? "-"}</Typography>
        </GridItem>
    );
};

export type EndItemProps = {
    end: number;
    invalid?: boolean;
    highlight?: boolean;
};

const addEndHightlight = (style: object, theme: Theme): object => {
    return {...style, backgroundColor: orange[400], color: theme.palette.text.secondary};
};

const addInvalidEndHightlight = (style: object, theme: Theme): object => {
    return {...style, backgroundColor: red[400], color: theme.palette.text.secondary};
};

export const EndItem: React.FC<EndItemProps> = (props: EndItemProps) => {
    const theme = useTheme();
    let styles: object = {
        backgroundColor: blue[400],
        color: "#fff",
        height: "100%",
        alignItems: "center",
        padding: "0",
    };

    if (props.highlight) styles = addEndHightlight(styles, theme);
    else if (props.invalid) styles = addInvalidEndHightlight(styles, theme);

    return (
        <GridItem sx={styles}>
            <Typography
                variant="h6"
                sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                }}
            >
                {props.end == 0 ? "H" : props.end}
            </Typography>
        </GridItem>
    );
};

export const TransparentItem: React.FC = () => {
    return (
        <GridItem sx={{opacity: "0", display: "flex", padding: "0"}}>
            <EndItem end={11}></EndItem>
        </GridItem>
    );
};

export const EndFakeHeader: React.FC = () => {
    return (
        <GridItem sx={{backgroundColor: blue[400], color: "#fff", height: "fit-content"}}>
            <Typography variant="h5">●</Typography>
        </GridItem>
    );
};

export const EndFakePlayer: React.FC = () => {
    const styles = {
        overflow: "hidden",
        whiteSpace: "nowrap",
        height: "100%",
    };

    const isSmallScreen = useMediaQuery("(max-width:420px)");

    return (
        <GridItem>
            <Typography sx={isSmallScreen ? addVerticalTextOrientation(styles) : styles} variant="h6">
                1
            </Typography>
        </GridItem>
    );
};
