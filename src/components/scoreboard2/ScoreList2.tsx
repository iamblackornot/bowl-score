import {Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import {ScoreItem2} from "./GridItem2";
import {blue} from "@mui/material/colors";

export type ScoreListProps2 = {
    scores: number[];
    ends: number;
    enableTotalScoreCol: boolean | null;
};

const ScoreList2: React.FC<ScoreListProps2> = (props: ScoreListProps2) => {
    const partialSum: number[] = [];

    if (props.enableTotalScoreCol) {
        props.scores.reduce((accumulator, currentValue) => {
            const newSum = accumulator + currentValue;
            partialSum.push(newSum);
            return newSum;
        }, 0);
    }

    return (
        <Box sx={{bgcolor: blue[100], width: "100%"}}>
            <Grid container spacing={0.25}>
                {props.scores.map((score: number, index: number) => (
                    <React.Fragment key={`score_${index}`}>
                        <Grid xs={props.enableTotalScoreCol ? 6 : 12}>
                            <ScoreItem2 end={index} value={score} />
                        </Grid>
                        {props.enableTotalScoreCol && (
                            <Grid xs={6}>
                                <ScoreItem2 end={index} value={partialSum[index]} />
                            </Grid>
                        )}
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
};

export default ScoreList2;
