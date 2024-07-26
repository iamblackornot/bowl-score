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
    currEnd: number;
    onScoreClick?: (teamIndex: number, end: number) => void;
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
            <ScoreList
                scores={props.scores}
                currEnd={props.currEnd}
                enableTotalScoreCol={props.enableTotalScoreCol}
                onScoreClick={(end: number) => props.onScoreClick && props.onScoreClick(props.index, end)}
            />
        </Box>
    );
};

export default TeamScore;
