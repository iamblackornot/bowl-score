import * as React from "react";
import {styled} from "@mui/material/styles";
import {blue} from "@mui/material/colors";
import {Box, Grid, Paper, Typography} from "@mui/material";

export const ScoreItemBox = styled(Paper)(({theme}) => {
    return {
        backgroundColor: blue[400],
        color: "#fff",
        padding: theme.spacing(1),
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        minWidth: "2rem",
    };
});

export interface ScoreSelectProps {
    values: number[];
    onValueSelected: (value: number) => void;
}

const ScoreSelect: React.FC<ScoreSelectProps> = (props: ScoreSelectProps) => {
    return (
        <Box sx={{maxWidth: "400px"}}>
            <Grid container spacing={1}>
                {props.values.map((value: number) => (
                    <ValueItem key={`score_${value}`} value={value} onClick={() => props.onValueSelected(value)} />
                ))}
            </Grid>
        </Box>
    );
};

export interface ValueItemProps {
    value: number;
    onClick: () => void;
}

export const ValueItem: React.FC<ValueItemProps> = (props: ValueItemProps) => {
    return (
        <Grid item xs={3}>
            <ScoreItemBox elevation={2} onClick={() => props.onClick()}>
                <Typography variant="h5">{props.value}</Typography>
            </ScoreItemBox>
        </Grid>
    );
};

export default ScoreSelect;
