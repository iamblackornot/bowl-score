import * as React from "react";
import {Box, Stack} from "@mui/material";
import TeamRoster from "./TeamRoster2";
import IPlayer from "../../models/IPlayer";
import ScoreList from "./ScoreList2";
import EndColumn from "./EndColumn2";
import {blue} from "@mui/material/colors";

import {styled} from "@mui/material/styles";

export const ScoreBox = styled(Box)(({theme}) => {
    return {
        backgroundColor: blue[400],
        padding: theme.spacing(0.25),
        bgcolor: blue[400],
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: "250px",
        maxWidth: "700px",
        width: "100%",
        height: "fit-content",
    };
});

export type ScoreboardProps2 = {
    teams: IPlayer[][];
    scores: number[][];
};

const Scoreboard2: React.FC<ScoreboardProps2> = (props: ScoreboardProps2) => {
    return (
        <ScoreBox>
            <Stack direction="column" spacing={0.25}>
                <Stack direction="row" spacing={0.25} sx={{height: "fit-content"}}>
                    <TeamRoster players={props.teams?.[0]} index={0} />
                    <TeamRoster players={props.teams?.[1]} index={1} />
                </Stack>
                <Stack direction="row" spacing={0} sx={{height: "fit-content"}}>
                    <ScoreList scores={props.scores?.[0]} ends={22} enableTotalScoreCol />
                    <EndColumn ends={22} />
                    <ScoreList scores={props.scores?.[1]} ends={22} enableTotalScoreCol />
                </Stack>
            </Stack>
        </ScoreBox>
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

export default Scoreboard2;
