import * as React from "react";
import {Stack} from "@mui/material";
import IPlayer from "../../models/IPlayer";
import EndColumn from "./EndColumn";
import TeamScore from "./TeamScore";
import SetScoreDialog from "../../dialogs/SetScoreDialog";
import useScoreDialog from "../../hooks/ScoreDialog";
import {iota} from "../../utility/common";

export type ScoreboardProps = {
    teams: IPlayer[][];
    scores: number[][];
    validEnds?: boolean[];
    bowlsPerPlayer: number;
    currEnd: number;
    onScoreChange?: (scores: ScoreParams[]) => void;
};

export type ScoreParams = {
    value: number;
    teamIndex: number;
    end: number;
};

const Scoreboard: React.FC<ScoreboardProps> = (props: ScoreboardProps) => {
    const scoreDialog = useScoreDialog();

    const onScoreSet = (value: number) => {
        if (!props.onScoreChange) return;

        const scoresChanged: ScoreParams[] = [
            {value, teamIndex: scoreDialog.state.teamIndex, end: scoreDialog.state.end},
        ];

        for (let i = 0; i < props.teams.length; ++i) {
            if (i !== scoreDialog.state.teamIndex) {
                scoresChanged.push({value: 0, teamIndex: i, end: scoreDialog.state.end});
            }
        }

        props.onScoreChange(scoresChanged);
    };

    const onScoreClick = (teamIndex: number, end: number) => {
        const teamSize: number = props.teams?.[0]?.length ?? 0;
        const maxScore: number = props.bowlsPerPlayer * teamSize;
        scoreDialog.open(iota(maxScore + 1), teamIndex, end);
    };

    return (
        <React.Fragment>
            <Stack direction="row" sx={{height: "fit-content"}}>
                <TeamScore
                    index={0}
                    players={props.teams?.[0]}
                    scores={props.scores?.[0]}
                    enableTotalScoreCol
                    currEnd={props.currEnd}
                    onScoreClick={onScoreClick}
                />
                <EndColumn
                    ends={props.scores?.[0]?.length}
                    currEnd={props.currEnd}
                    teamSize={props.teams?.[1]?.length}
                />
                <TeamScore
                    index={1}
                    players={props.teams?.[1]}
                    scores={props.scores?.[1]}
                    enableTotalScoreCol
                    currEnd={props.currEnd}
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
