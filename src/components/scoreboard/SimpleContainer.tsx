import * as React from "react";
import Container from "@mui/material/Container";
import {Box, Stack, Typography, useMediaQuery} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from "@mui/material/styles";
import {EndItem, PlayerItem, ScoreItem, TeamHeader, TransparentItem} from "./GridItem";

const Item = styled(Box)(({theme}) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    backgroundColor: "#fff",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export type SimpleContainerProps = {
    // types...
};

const SimpleContainer: React.FC<SimpleContainerProps> = () => {
    const isSmallScreen = useMediaQuery("(max-width:420px)");
    //const isSmallScreen = useMediaQuery("xs");

    return (
        <React.Fragment>
            <Box
                sx={{
                    height: "100%",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    minWidth: {
                        xs: "200px",
                    },
                    maxWidth: {
                        xs: "500px",
                    },
                }}
            >
                <Stack direction="row" spacing={0.25}>
                    <TeamHeader text="TEAM 1" />
                    {/* <TransparentItem /> */}
                    <EndItem text="00" />
                    <TeamHeader text="TEAM 2" />
                </Stack>
                <Stack direction="row">
                    <Grid container spacing={0.25} sx={{width: "100%"}}>
                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="1 NAME" />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="TEAM 1 - PLAYER 2 NAME" />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="PLAYER 3 NAME" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0.25} direction={"column"}>
                        <EndItem text="00" />
                        <EndItem text="00" />
                        <EndItem text="00" />
                    </Grid>
                    <Grid container spacing={0.25} sx={{width: "100%"}}>
                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="1 NAME" />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="TEAM 1 - PLAYER 2 NAME" />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="PLAYER 3 NAME" />
                        </Grid>
                    </Grid>
                </Stack>
                {/* <Grid container spacing={0.25}>
                    <Grid height="100%">
                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="1 NAME" />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="TEAM 1 - PLAYER 2 NAME" />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="PLAYER 3 NAME" />
                        </Grid>
                    </Grid>
                    <Grid direction={"column"}>
                        <EndItem text="00" />
                        <EndItem text="00" />
                        <EndItem text="00" />
                    </Grid>
                    <Grid>
                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="1 NAME" />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="TEAM 1 - PLAYER 2 NAME" />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="PLAYER 3 NAME" />
                        </Grid>
                    </Grid>
                </Grid> */}
            </Box>
        </React.Fragment>
    );
};

const temp: React.FC<SimpleContainerProps> = () => {
    const isSmallScreen = useMediaQuery("(max-width:420px)");
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                minWidth: {
                    xs: "100px",
                },
                maxWidth: {
                    // xs: "100%",
                    xs: "300px",
                },
            }}
        >
            <Box flexGrow={1} flexShrink={1} sx={{bgcolor: "#cfe8fc"}}>
                <TeamHeader text="TEAM 1" />
                <Grid container spacing={0.25}>
                    <Grid xs={isSmallScreen ? 4 : 12}>
                        <PlayerItem vertical={isSmallScreen} text="TEAM 1 - PLAYER 1 NAME" />
                    </Grid>

                    <Grid xs={isSmallScreen ? 4 : 12}>
                        <PlayerItem vertical={isSmallScreen} text="TEAM 1 - PLAYER 2 NAME" />
                    </Grid>

                    <Grid xs={isSmallScreen ? 4 : 12}>
                        <PlayerItem vertical={isSmallScreen} text="TEAM 1 - PLAYER 3 NAME" />
                    </Grid>
                </Grid>
            </Box>
            <Box flexGrow={1} flexShrink={1} sx={{bgcolor: "#fff"}}>
                <Stack direction="row" sx={{flexDirection: "row"}}>
                    <Grid xs={5} container spacing={0.25}>
                        <Grid xs={6}>
                            <ScoreItem end={1} value={10} />
                        </Grid>
                        <Grid xs={6}>
                            <ScoreItem end={1} value={10} />
                        </Grid>
                        {/* <Grid xs={6}>
                <ScoreItem end={2} value={0} />
            </Grid>
            <Grid xs={6}>
                <ScoreItem end={2} value={0} />
            </Grid> */}
                    </Grid>
                    <Grid xs={2} container>
                        <EndItem end={0} />
                    </Grid>
                    <Grid xs={5} container spacing={0.25}>
                        <Grid xs={6}>
                            <ScoreItem end={1} value={10} />
                        </Grid>
                        <Grid xs={6}>
                            <ScoreItem end={1} value={10} />
                        </Grid>
                        {/* <Grid xs={6}>
                <ScoreItem end={2} value={0} />
            </Grid>
            <Grid xs={6}>
                <ScoreItem end={2} value={0} />
            </Grid> */}
                    </Grid>
                </Stack>
            </Box>
        </Box>
    );
};

export default SimpleContainer;
