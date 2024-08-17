import * as React from "react";
import {Stack} from "@mui/material";
import EndColumn from "./EndColumn";
import TeamScore from "./TeamScore";
import SetScoreDialog from "../../dialogs/SetScoreDialog";
import useScoreDialog from "../../hooks/ScoreDialog";
import {iota} from "../../utility/common";
import {IGame} from "../../models/IGame";
import {AuthContext} from "../../hooks/Auth";

export type ScoreboardProps = {
    game: IGame;
    onScoreChange?: (scores: ScoreParams[]) => void;
};

export type ScoreParams = {
    value: number;
    teamIndex: number;
    end: number;
};

const Scoreboard: React.FC<ScoreboardProps> = (props: ScoreboardProps) => {
    const scoreDialog = useScoreDialog();
    const auth = React.useContext(AuthContext);

    const onScoreSet = (value: number) => {
        if (!props.onScoreChange) return;

        const scoresChanged: ScoreParams[] = [
            {value, teamIndex: scoreDialog.state.teamIndex, end: scoreDialog.state.end},
        ];

        for (let i = 0; i < props.game.teams.length; ++i) {
            if (i !== scoreDialog.state.teamIndex) {
                scoresChanged.push({value: 0, teamIndex: i, end: scoreDialog.state.end});
            }
        }

        props.onScoreChange(scoresChanged);
    };

    const onScoreClick = (teamIndex: number, end: number) => {
        if (!auth.isAuthed) return;

        const teamSize: number = props.game.teams?.[0]?.length ?? 0;
        const maxScore: number = props.game.bowls * teamSize;
        scoreDialog.open(iota(maxScore + 1), teamIndex, end);
    };

    return (
        <React.Fragment>
            <Stack direction="row" sx={{maxWidth: "640px", height: "fit-content"}}>
                <TeamScore
                    index={0}
                    players={props.game.teams?.[0]}
                    scores={props.game.scores?.[0]}
                    enableTotalScoreCol
                    currEnd={props.game.currEnd}
                    onScoreClick={onScoreClick}
                />
                <EndColumn
                    ends={props.game.scores?.[0]?.length}
                    currEnd={props.game.currEnd}
                    teamSize={props.game.teams?.[0]?.length}
                    width="30%"
                />
                <TeamScore
                    index={1}
                    players={props.game.teams?.[1]}
                    scores={props.game.scores?.[1]}
                    enableTotalScoreCol
                    currEnd={props.game.currEnd}
                    onScoreClick={onScoreClick}
                />
            </Stack>
            <SetScoreDialog
                isOpen={scoreDialog.state.isOpen}
                values={scoreDialog.state.values}
                onValueSelected={onScoreSet}
                onClose={scoreDialog.close}
            />
        </React.Fragment>
    );
};

export default Scoreboard;
