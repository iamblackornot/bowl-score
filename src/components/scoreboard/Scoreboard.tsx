import * as React from "react";
import {Box, Stack} from "@mui/material";
import TeamRoster from "./TeamRoster";
import IPlayer from "../../models/IPlayer";
import ScoreList from "./ScoreList";
import EndColumn from "./EndColumn";
import TeamScore from "./TeamScore";

export type ScoreboardProps = {
    teams: IPlayer[][];
    scores: number[][];
};

const Scoreboard: React.FC<ScoreboardProps> = (props: ScoreboardProps) => {
    return (
        <Stack direction="row" sx={{height: "fit-content"}}>
            <TeamScore players={props.teams?.[0]} scores={props.scores?.[0]} />
            <EndColumn ends={props.scores?.[0]?.length} teamSize={props.teams?.[1]?.length} />
            <TeamScore players={props.teams?.[1]} scores={props.scores?.[1]} />
        </Stack>
    );
};

const Scoreboard2: React.FC<ScoreboardProps> = () => {
    //const isSmallScreen = useMediaQuery("(max-width:420px)");
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
                {/* <Box flexGrow={1} flexShrink={1} sx={{bgcolor: "#cfe8fc"}}> */}
                {/* <Box sx={{bgcolor: "#cfe8fc"}}>
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
                </Box> */}

                <TeamRoster index={0} players={mockTeam} />
                <ScoreList scores={mockScores} ends={21} enableTotalScoreCol />

                {/* <Stack sx={{bgcolor: "#cfe8fc"}}>
                    <TeamHeader text="TEAM 1" />
                    <Stack direction={isSmallScreen ? "row" : "column"} spacing={0.25} sx={{width: "100%"}}>
                        <PlayerItem text="TEAM 1 -" />
                        <PlayerItem text="TEAM 1 - " />
                        <PlayerItem text="TEAM 1 sadsadsa" />
                    </Stack>
                </Stack> */}
                {/* <Box sx={{bgcolor: "#fff"}}>
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
                </Box> */}
            </Box>
        </React.Fragment>
    );
};

// export const Scoreboard2: React.FC<ScoreboardProps> = () => {
//     const isSmallScreen = useMediaQuery("(max-width:420px)");
//     const isSmallScreen = useMediaQuery("xs");

//     return (
//         <React.Fragment>
//             <Box
//                 sx={{
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     minWidth: {
//                         xs: "100px",
//                     },
//                     maxWidth: {
//                         xs: "100%",
//                         xs: "300px",
//                     },
//                 }}
//             >
//                 <Box flexGrow={1} flexShrink={1} sx={{bgcolor: "#cfe8fc"}}>
//                     <TeamHeader text="TEAM 1" />
//                     <Grid container spacing={0.25}>
//                         <Grid xs={isSmallScreen ? 4 : 12}>
//                             <PlayerItem text="TEAM 1 - " />
//                         </Grid>

//                         <Grid xs={isSmallScreen ? 4 : 12}>
//                             <PlayerItem text="TEAM 1" />
//                         </Grid>

//                         <Grid xs={isSmallScreen ? 4 : 12}>
//                             <PlayerItem text="TEAM 1 - " />
//                         </Grid>
//                     </Grid>
//                 </Box>
//                 <Box flexGrow={1} sx={{bgcolor: "#fff"}}>
//                     <Grid container spacing={0.25}>
//                         <Grid xs={6}>
//                             <ScoreItem end={1} value={10} />
//                         </Grid>
//                         <Grid xs={6}>
//                             <ScoreItem end={1} value={10} />
//                         </Grid>
//                         <Grid xs={6}>
//                             <ScoreItem end={2} value={0} />
//                         </Grid>
//                         <Grid xs={6}>
//                             <ScoreItem end={2} value={0} />
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Box>
//         </React.Fragment>
//     );
// };

export default Scoreboard;
