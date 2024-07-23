import * as React from "react";
import {Grid, Stack} from "@mui/material";
import {EndFakeHeader, EndFakePlayer, EndItem, PlayerItem, TeamHeader} from "./GridItem";
import {blue} from "@mui/material/colors";
import useMedia from "../../hooks/Media";

export type EndColumnProps = {
    ends: number;
    teamSize: number;
};

const EndColumn: React.FC<EndColumnProps> = (props: EndColumnProps) => {
    const {isSmallScreen} = useMedia();

    return (
        <React.Fragment>
            <Stack sx={{minWidth: "2.5rem", width: "30%"}}>
                <Stack
                    sx={{
                        backgroundColor: blue[100],
                        opacity: "1",
                    }}
                >
                    <EndFakeHeader />
                    <Stack direction={isSmallScreen ? "row" : "column"} spacing={0.25} sx={{opacity: "0"}}>
                        {[...Array(props.teamSize).keys()].map((value: number) => (
                            <EndFakePlayer key={`end_fake_player_${value}`} />
                        ))}
                    </Stack>
                </Stack>
                <Stack
                    spacing={0.5}
                    sx={{
                        height: "100%",
                        backgroundColor: "#fff",
                    }}
                >
                    <EndItem key={`end_item_0}`} text="H" />
                    {[...Array(props.ends - 1).keys()].map((value: number) => (
                        <EndItem key={`end_item_${value + 1}`} text={(value + 1).toString()} />
                    ))}
                </Stack>
            </Stack>
        </React.Fragment>
    );
};

export default EndColumn;

export const EndColumn2: React.FC<EndColumnProps> = (props: EndColumnProps) => {
    const {isSmallScreen} = useMedia();

    return (
        <React.Fragment>
            <Stack sx={{backgroundColor: blue[100], opacity: "1", minWidth: "2.5rem"}}>
                {/* <EndFakeHeader /> */}
                <TeamHeader text="●" />

                <Grid container spacing={0.25} sx={{opacity: "1"}}>
                    <Grid key={`end_fake_player_item_${0}`} xs={isSmallScreen ? Math.floor(12 / props.teamSize) : 12}>
                        <PlayerItem text="1" />
                    </Grid>
                    <Grid key={`end_fake_player_item_${1}`} xs={isSmallScreen ? Math.floor(12 / props.teamSize) : 12}>
                        <PlayerItem text="1" />
                    </Grid>
                    <Grid key={`end_fake_player_item_${2}`} xs={isSmallScreen ? Math.floor(12 / props.teamSize) : 12}>
                        <PlayerItem text="1" />
                    </Grid>
                </Grid>
            </Stack>
        </React.Fragment>
    );
};

// <Box
// sx={{
//     // height: "100%",
//     display: "flex",
//     flexDirection: "column",
//     minWidth: {
//         xs: "100px",
//     },
//     maxWidth: {
//         // xs: "100%",
//         xs: "300px",
//     },
// }}
// ></Box>

{
    /* <Grid container spacing={0.25} sx={{opacity: "1"}}>
{[...Array(props.teamSize).keys()].map((value: number) => (
    <Grid
        key={`end_fake_player_item_${value}`}
        xs={isSmallScreen ? Math.floor(12 / props.teamSize) : 12}
    >
        <PlayerItem text="1" />
    </Grid>
))}
</Grid> */
}
