import * as React from "react";

interface ScoreDialogState {
    isOpen: boolean;
    values: number[];
    teamIndex: number;
    end: number;
}

const defaultScoreDialogState: ScoreDialogState = {
    isOpen: false,
    values: [],
    teamIndex: 0,
    end: 0,
};

const useScoreDialog = () => {
    const [scoreDialogState, setScoreDialogState] = React.useState<ScoreDialogState>(defaultScoreDialogState);

    const close = () => {
        setScoreDialogState({...scoreDialogState, isOpen: false});
    };

    const open = (values: number[], teamIndex: number, end: number) => {
        setScoreDialogState({
            isOpen: true,
            values,
            teamIndex,
            end,
        });
    };

    return {state: scoreDialogState, open, close};
};

export default useScoreDialog;
