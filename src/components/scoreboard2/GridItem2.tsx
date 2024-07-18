import * as React from "react";
import {Box, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {blue} from "@mui/material/colors";
import useMedia from "../../hooks/Media";

export const GridItem2 = styled(Box)(({theme}) => {
    const {isSmallScreen} = useMedia();
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

export type TextItemProps2 = {
    text: string;
};

export const TeamHeader2: React.FC<TextItemProps2> = (props: TextItemProps2) => {
    return (
        <GridItem2 sx={{backgroundColor: blue[400], color: "#fff", height: "fit-content"}}>
            <Typography variant="h5">{props.text}</Typography>
        </GridItem2>
    );
};

export const PlayerItem2: React.FC<TextItemProps2> = (props: TextItemProps2) => {
    const styles = {
        maxHeight: "1.75rem",
        overflow: "hidden",
        whiteSpace: "nowrap",
        height: "100%",
        // width: "100%",
        fontSize: "calc(1rem + 0.5vw)",
    };

    //const {isSmallScreen} = useMedia();

    return (
        <GridItem2>
            <Typography sx={styles} variant="h6">
                {props.text}
            </Typography>
        </GridItem2>
    );
};

export type ScoreItemProps2 = {
    end: number;
    value: number | null;
};

export const ScoreItem2: React.FC<ScoreItemProps2> = (props: ScoreItemProps2) => {
    const {isSmallScreen} = useMedia();

    return (
        <GridItem2>
            <Typography variant={isSmallScreen ? "h5" : "h4"}>{props.value ?? ""}</Typography>
        </GridItem2>
    );
};

export type EndItemProps2 = {
    end: number;
};

export const EndItem2: React.FC<TextItemProps2> = (props: TextItemProps2) => {
    return (
        // <GridItem sx={{backgroundColor: blue[400], color: "#fff", width: "6rem"}}>
        <GridItem2 sx={{backgroundColor: blue[400], color: "#fff", height: "100%", alignItems: "center"}}>
            <Typography
                variant="h6"
                sx={{
                    fontSize: "calc(1rem + 1vw)",
                    fontWeight: "600",
                }}
            >
                {props.text}
            </Typography>
        </GridItem2>
    );
};

// export const TransparentItem: React.FC = () => {
//     return (
//         <GridItem sx={{opacity: "0", display: "flex", padding: "0"}}>
//             <EndItem text="0"></EndItem>
//         </GridItem>
//     );
// };

// export const EndFakeHeader: React.FC = () => {
//     return (
//         <GridItem
//             //sx={{backgroundColor: blue[400], color: blue[400], height: "fit-content", minWidth: "2rem"}}
//             sx={{backgroundColor: blue[400], color: "#fff", height: "fit-content", minWidth: "2.5rem"}}
//         >
//             <Typography variant="h5">●</Typography>
//         </GridItem>
//     );
// };

// export const EndFakePlayer: React.FC = () => {
//     const styles = {
//         maxHeight: "1.75rem",
//         overflow: "hidden",
//         whiteSpace: "nowrap",
//         height: "100%",
//         // width: "100%",
//         //backgr
//     };

//     const isSmallScreen = useMediaQuery("(max-width:420px)");

//     return (
//         <GridItem>
//             <Typography sx={isSmallScreen ? addVerticalTextOrientation(styles) : styles} variant="h6">
//                 1
//             </Typography>
//         </GridItem>
//     );
// };
