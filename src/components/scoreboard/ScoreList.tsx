import {Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import {ScoreItem} from "./GridItem";

export type ScoreListProps = {
    scores: number[];
    ends: number;
    enableTotalScoreCol?: boolean;
};

const ScoreList: React.FC<ScoreListProps> = (props: ScoreListProps) => {
    const partialSum: number[] = [];

    if (props.enableTotalScoreCol) {
        props.scores.reduce((accumulator, currentValue) => {
            const newSum = accumulator + currentValue;
            partialSum.push(newSum);
            return newSum;
        }, 0);
    }

    return (
        <Box sx={{bgcolor: "#fff"}}>
            <Grid container spacing={0.5}>
                {props.scores.map((score: number, index: number) => (
                    <React.Fragment key={`score_${index}`}>
                        <Grid xs={props.enableTotalScoreCol ? 6 : 12}>
                            <ScoreItem end={index} value={score} />
                        </Grid>
                        {props.enableTotalScoreCol && (
                            <Grid xs={6}>
                                <ScoreItem end={index} value={partialSum[index]} />
                            </Grid>
                        )}
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
};

export default ScoreList;
