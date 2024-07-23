import * as React from "react";
import {Stack} from "@mui/material";
import IPlayer from "../../models/IPlayer";
import EndColumn from "./EndColumn";
import TeamScore from "./TeamScore";

export type ScoreboardProps = {
    teams: IPlayer[][];
    scores: number[][];
};

const Scoreboard: React.FC<ScoreboardProps> = (props: ScoreboardProps) => {
    return (
        <Stack direction="row" sx={{height: "fit-content"}}>
            <TeamScore index={0} players={props.teams?.[0]} scores={props.scores?.[0]} enableTotalScoreCol />
            <EndColumn ends={props.scores?.[0]?.length} teamSize={props.teams?.[1]?.length} />
            <TeamScore index={1} players={props.teams?.[1]} scores={props.scores?.[1]} enableTotalScoreCol />
        </Stack>
    );
};

export default Scoreboard;
