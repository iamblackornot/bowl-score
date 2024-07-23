import * as React from "react";
import {Box, Stack} from "@mui/material";
import EndColumn from "./EndColumn";
import {ScoreboardProps} from "./Scoreboard";
import {styled} from "@mui/material/styles";
import {blue} from "@mui/material/colors";
import TeamRoster from "./TeamRoster";
import ScoreList from "./ScoreList";

const ScoreBox = styled(Box)(({theme}) => {
    return {
        backgroundColor: blue[400],
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: "250px",
        maxWidth: "700px",
        width: "100%",
        height: "fit-content",
        margin: "0",
    };
});

const CutthroatScoreboard: React.FC<ScoreboardProps> = (props: ScoreboardProps) => {
    const total: number[] = [];

    for (const score of props.scores) {
        total.push(
            score.reduce((acc, value) => {
                return acc + value;
            }, 0)
        );
    }
    return (
        <ScoreBox>
            <Stack direction="row" sx={{height: "fit-content"}}>
                <EndColumn teamSize={1} ends={22} />
                <Stack direction="row" spacing={0.25} sx={{height: "fit-content", overflow: "hidden"}}>
                    <Stack direction="column" spacing={0} sx={{overflow: "hidden"}}>
                        <TeamRoster players={props.teams?.[0]} index={0} />
                        <ScoreList scores={props.scores?.[0]} ends={22} enableTotalScoreCol />
                    </Stack>
                    <Stack direction="column" spacing={0} sx={{overflow: "hidden"}}>
                        <TeamRoster players={props.teams?.[1]} index={1} />
                        <ScoreList scores={props.scores?.[1]} ends={22} enableTotalScoreCol />
                    </Stack>
                    <Stack direction="column" spacing={0} sx={{overflow: "hidden"}}>
                        <TeamRoster players={props.teams?.[2]} index={2} />
                        <ScoreList scores={props.scores?.[2]} ends={22} enableTotalScoreCol />
                    </Stack>
                </Stack>
            </Stack>
        </ScoreBox>
    );
};

export default CutthroatScoreboard;
