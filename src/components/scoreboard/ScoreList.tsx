import {Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import {ScoreItem} from "./GridItem";

export type ScoreListProps = {
    scores: number[];
    enableTotalScoreCol?: boolean;
    currEnd: number;
    validEnds?: boolean[];
    onScoreClick?: (end: number) => void;
};

const ScoreList: React.FC<ScoreListProps> = (props: ScoreListProps) => {
    const partialSum: number[] = [];

    if (props.enableTotalScoreCol) {
        for (let i = 0, sum = 0; i <= props.currEnd; ++i) {
            sum += props.scores[i];
            partialSum.push(sum);
        }
    }

    return (
        <Box sx={{bgcolor: "#fff"}}>
            <Grid container spacing={0.5}>
                {props.scores.map((score: number, index: number) => {
                    if (index === 0) return;

                    return (
                        <React.Fragment key={`score_${index}`}>
                            <Grid xs={props.enableTotalScoreCol ? 6 : 12}>
                                <ScoreItem
                                    end={index}
                                    value={score !== 0 ? score : undefined}
                                    highlight={index == props.currEnd}
                                    invalid={props.validEnds && !props.validEnds[index] && index <= props.currEnd}
                                    onClick={() => index <= props.currEnd && props.onScoreClick?.(index)}
                                />
                            </Grid>
                            {props.enableTotalScoreCol && (
                                <Grid xs={6}>
                                    <ScoreItem
                                        end={index}
                                        value={index <= props.currEnd ? partialSum[index] : undefined}
                                        invalid={props.validEnds && !props.validEnds[index] && index <= props.currEnd}
                                        highlight={index == props.currEnd}
                                    />
                                </Grid>
                            )}
                        </React.Fragment>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ScoreList;
