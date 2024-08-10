import React from "react";
import {InputLabel, Paper, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {blue} from "@mui/material/colors";

export interface ToggleSelectOption<T> {
    value: T;
    label: string;
}

export type GameTypeSelectProps<T> = {
    options: ToggleSelectOption<T>[];
    label: string;
    value: NonNullable<T>;
    OnValueChanged: (value: T) => void;
};

const groupStyle = {
    ".MuiToggleButtonGroup-grouped:hover": {
        backgroundColor: blue[300],
        color: "white",
    },
    ".MuiToggleButtonGroup-grouped": {
        backgroundColor: blue[50],
        minWidth: "45px",
    },
    ".Mui-selected": {
        backgroundColor: `${blue[700]} !important`,
        color: "white !important",
    },
};

const ToggleSelect = <T,>(props: GameTypeSelectProps<T>) => {
    const onGameTypeChanged = (_event: React.MouseEvent<HTMLElement>, value: T) => {
        if (value !== null) {
            props.OnValueChanged(value);
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Stack direction="column">
                <InputLabel
                    size="normal"
                    sx={{
                        textAlign: "center",
                    }}
                >
                    {props.label}
                </InputLabel>
                <ToggleButtonGroup
                    value={props.value}
                    exclusive
                    onChange={onGameTypeChanged}
                    aria-label="Game Type"
                    size="small"
                    sx={groupStyle}
                >
                    {props.options.map((option, index) => (
                        <ToggleButton value={option.value!} key={`opt${index}`}>
                            {option.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>
        </Paper>
    );
};

export default ToggleSelect;
