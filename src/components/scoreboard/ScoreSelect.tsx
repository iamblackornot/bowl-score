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
    };
});

export interface ScoreSelectProps {
    values: number[];
    onValueSelected: (value: number) => void;
}

const ScoreSelect: React.FC<ScoreSelectProps> = (props: ScoreSelectProps) => {
    return (
        <Box sx={{maxWidth: "500px", width: "100%"}}>
            <Grid container spacing={1}>
                {props.values.map((value: number) => (
                    <ValueItem
                        key={`score_${value}`}
                        itemsPerRow={Math.min(props.values.length, 4)}
                        value={value}
                        onClick={() => props.onValueSelected(value)}
                    />
                ))}
            </Grid>
        </Box>
    );
};

export interface ValueItemProps {
    itemsPerRow: number;
    value: number;
    onClick: () => void;
}

export const ValueItem: React.FC<ValueItemProps> = (props: ValueItemProps) => {
    return (
        <Grid item xs={Math.max(12 / props.itemsPerRow, 1)}>
            <ScoreItemBox elevation={2} onClick={() => props.onClick()}>
                <Typography variant="h5">{props.value}</Typography>
            </ScoreItemBox>
        </Grid>
    );
};

export default ScoreSelect;
