import * as React from "react";
import Container from "@mui/material/Container";
import {Box, useMediaQuery} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {PlayerItem, ScoreItem, TeamHeader} from "./GridItem";

export type ScoreboardProps = {
    // types...
};

const Scoreboard: React.FC<ScoreboardProps> = () => {
    const isSmallScreen = useMediaQuery("(max-width:420px)");
    //const isSmallScreen = useMediaQuery("xs");

    return (
        <React.Fragment>
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
                            <PlayerItem text="TEAM 1 -" />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="TEAM 1 - " />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="TEAM 1 sadsadsa" />
                        </Grid>
                    </Grid>
                </Box>
                <Box flexGrow={1} sx={{bgcolor: "#fff"}}>
                    <Grid container spacing={0.25}>
                        <Grid xs={6}>
                            <ScoreItem end={1} value={10} />
                        </Grid>
                        <Grid xs={6}>
                            <ScoreItem end={1} value={10} />
                        </Grid>
                        <Grid xs={6}>
                            <ScoreItem end={2} value={0} />
                        </Grid>
                        <Grid xs={6}>
                            <ScoreItem end={2} value={0} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export const Scoreboard2: React.FC<ScoreboardProps> = () => {
    const isSmallScreen = useMediaQuery("(max-width:420px)");
    //const isSmallScreen = useMediaQuery("xs");

    return (
        <React.Fragment>
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
                            <PlayerItem text="TEAM 1 - " />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="TEAM 1" />
                        </Grid>

                        <Grid xs={isSmallScreen ? 4 : 12}>
                            <PlayerItem text="TEAM 1 - " />
                        </Grid>
                    </Grid>
                </Box>
                <Box flexGrow={1} sx={{bgcolor: "#fff"}}>
                    <Grid container spacing={0.25}>
                        <Grid xs={6}>
                            <ScoreItem end={1} value={10} />
                        </Grid>
                        <Grid xs={6}>
                            <ScoreItem end={1} value={10} />
                        </Grid>
                        <Grid xs={6}>
                            <ScoreItem end={2} value={0} />
                        </Grid>
                        <Grid xs={6}>
                            <ScoreItem end={2} value={0} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default Scoreboard;
