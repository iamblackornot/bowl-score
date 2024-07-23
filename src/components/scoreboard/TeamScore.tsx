import * as React from "react";
import {Box} from "@mui/material";
import TeamRoster from "./TeamRoster";
import IPlayer from "../../models/IPlayer";
import ScoreList from "./ScoreList";

export type TeamScoreProps = {
    index: number;
    players: IPlayer[];
    scores: number[];
    enableTotalScoreCol?: boolean;
};

const TeamScore: React.FC<TeamScoreProps> = (props: TeamScoreProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "100px",
                maxWidth: "300px",
                width: "100%",
            }}
        >
            <TeamRoster index={props.index} players={props.players} />
            <ScoreList scores={props.scores} ends={22} enableTotalScoreCol={props.enableTotalScoreCol} />
        </Box>
    );
};

export default TeamScore;
