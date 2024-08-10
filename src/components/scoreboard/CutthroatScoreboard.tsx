import * as React from "react";
import {Box, Stack} from "@mui/material";
import EndColumn from "./EndColumn";
import {ScoreboardProps, ScoreParams} from "./Scoreboard";
import {styled} from "@mui/material/styles";
import {blue} from "@mui/material/colors";
import TeamRoster from "./TeamRoster";
import ScoreList from "./ScoreList";
import SetScoreDialog from "../../dialogs/SetScoreDialog";
import useScoreDialog from "../../hooks/ScoreDialog";
import {iota} from "../../utility/common";

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
    const scoreDialog = useScoreDialog();

    const onScoreSet = (value: number) => {
        if (!props.onScoreChange) return;

        const scoresChanged: ScoreParams[] = [
            {value, teamIndex: scoreDialog.state.teamIndex, end: scoreDialog.state.end},
        ];

        props.onScoreChange(scoresChanged);
    };

    const onScoreClick = (teamIndex: number, end: number) => {
        const maxScore: number = 10;
        scoreDialog.open(iota(maxScore + 1), teamIndex, end);
    };

    return (
        <React.Fragment>
            <ScoreBox>
                <Stack direction="row" sx={{height: "fit-content"}}>
                    <EndColumn
                        teamSize={1}
                        ends={props.game.scores?.[0]?.length ?? 0}
                        currEnd={props.game.currEnd}
                        validEnds={props.game.validEnds}
                        width="15%"
                    />
                    <Stack direction="row" spacing={0.25} sx={{height: "fit-content", overflow: "hidden"}}>
                        {iota(3).map((index) => (
                            <Stack key={`stack_team_${index}`} direction="column" sx={{overflow: "hidden"}}>
                                <TeamRoster players={props.game.teams?.[index]} index={index} />
                                <ScoreList
                                    scores={props.game.scores?.[index]}
                                    validEnds={props.game.validEnds}
                                    currEnd={props.game.currEnd}
                                    onScoreClick={(end: number) => props.onScoreChange && onScoreClick(index, end)}
                                    enableTotalScoreCol
                                />
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            </ScoreBox>
            <SetScoreDialog
                isOpen={scoreDialog.state.isOpen}
                values={scoreDialog.state.values}
                onValueSelected={onScoreSet}
                onClose={scoreDialog.close}
            />
        </React.Fragment>
    );
};

export default CutthroatScoreboard;
