import React from "react";
import {Fab, Stack} from "@mui/material";
import GameInfo from "./GameInfo";
import Scoreboard, {ScoreParams} from "../scoreboard/Scoreboard";
import {IGame} from "../../models/IGame";
import {GameType} from "../../hooks/Game";
import CutthroatScoreboard from "../scoreboard/CutthroatScoreboard";

export type LiveGameProps = {
    game: IGame;
    onScoreChange?: (scores: ScoreParams[]) => void;
};

const LiveGame: React.FC<LiveGameProps> = (props: LiveGameProps) => {
    React.useEffect(() => {
        console.log("LiveGame mounted");
        return () => console.log("LiveGame unmounted");
    });

    return (
        <Stack spacing={2} display="flex" alignItems="center">
            <Stack>
                <GameInfo game={props.game} />
                {props.game.type !== GameType.Cutthroat && (
                    <Scoreboard game={props.game} onScoreChange={props.onScoreChange} />
                )}
                {props.game.type === GameType.Cutthroat && (
                    <CutthroatScoreboard game={props.game} onScoreChange={props.onScoreChange} />
                )}
            </Stack>
            <Fab variant="extended" size="medium" color="primary" sx={{marginBottom: "1rem"}}>
                End game
            </Fab>
        </Stack>
    );
};

export default LiveGame;
