import React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";

import {IconButton} from "@mui/material";

import IPlayer from "../models/IPlayer";
import useMedia from "../hooks/Media";
import CutthroatScoreboard from "../components/scoreboard/CutthroatScoreboard";
import {cutthroatEndValidate, getCutthroatCurrEnd, getValidEndList} from "../utility/common";
import {ScoreParams} from "../components/scoreboard/Scoreboard";

const mockTeams: IPlayer[][] = [
    [{id: 0, name: "Novak"}],
    [{id: 1, name: "Carlos Alcaraz"}],
    [{id: 2, name: "Pete Sampras"}],
];

// const mockScores: number[][] = [
//     [0, 2, 3, 0, 4, 0, 0, 1, 0, 3, 0, 3, 2, 3, 0, 4, 0, 3, 0, 0, 0, 1],
//     [3, 0, 0, 2, 0, 2, 4, 0, 3, 0, 2, 0, 0, 0, 2, 0, 2, 0, 4, 1, 1, 0],
//     [3, 0, 0, 2, 0, 2, 4, 0, 3, 0, 2, 0, 0, 0, 2, 0, 2, 0, 4, 1, 1, 0],
// ];

const defaultScores: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

interface DialogProps {
    open: boolean;
    onClose: (value?: string) => void;
}

export default function CutthroatScoreboardDemo(props: DialogProps) {
    const handleClose = () => {
        props.onClose();
    };

    const [scores, setScores] = React.useState<number[][]>(defaultScores);
    const [currEnd, setCurrEnd] = React.useState<number>(getCutthroatCurrEnd(scores));
    const [validEnds, setValidEnds] = React.useState<boolean[]>(getValidEndList(scores, currEnd, cutthroatEndValidate));
    const {isSmallScreen} = useMedia();

    const onScoreChange = (scoresChanged: ScoreParams[]) => {
        const newScores = scores;

        for (const newScore of scoresChanged) {
            newScores[newScore.teamIndex][newScore.end] = newScore.value;
        }

        const newCurrEnd = getCutthroatCurrEnd(newScores);
        setCurrEnd(newCurrEnd);
        setValidEnds(getValidEndList(scores, newCurrEnd + 1, cutthroatEndValidate));
        setScores(newScores);
    };

    return (
        <Dialog
            sx={{"& .MuiDialog-paper": {width: "100%"}}}
            maxWidth="md"
            fullScreen={isSmallScreen}
            open={props.open}
            scroll={"paper"}
            disableScrollLock={false}
        >
            <DialogTitle>Scoreboard Demo</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent
                dividers
                sx={{
                    justifyContent: "center",
                    display: "flex",
                    padding: "0px",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                }}
            >
                <CutthroatScoreboard
                    teams={mockTeams}
                    scores={scores}
                    currEnd={currEnd}
                    validEnds={validEnds}
                    bowlsPerPlayer={4}
                    onScoreChange={onScoreChange}
                />
            </DialogContent>
        </Dialog>
    );
}
