import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";

import {IconButton} from "@mui/material";

import Scoreboard from "../components/scoreboard/Scoreboard";
import IPlayer from "../models/IPlayer";
import useMedia from "../hooks/Media";

const mockTeam: IPlayer[] = [
    {id: 0, name: "sad boy"},
    {id: 1, name: "anchor"},
    {id: 2, name: "bad blues boy"},
];

const mockTeam2: IPlayer[] = [
    {id: 0, name: "Novak Djokovic"},
    {id: 1, name: "Carlos Alcaraz"},
    {id: 2, name: "Pete Sampras"},
];

const mockScores: number[] = [0, 2, 3, 0, 4, 0, 0, 1, 0, 3, 0, 3, 2, 3, 0, 4, 0, 3, 0, 0, 0, 1];
const mockScores2: number[] = [3, 0, 0, 2, 0, 2, 4, 0, 3, 0, 2, 0, 0, 0, 2, 0, 2, 0, 4, 1, 1, 0];

export interface DialogProps {
    open: boolean;
    onClose: (value?: string) => void;
}

export default function RegularScoreboardDemo1(props: DialogProps) {
    const handleClose = () => {
        props.onClose();
    };

    const {isSmallScreen} = useMedia();

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
                <Scoreboard teams={[mockTeam, mockTeam2]} scores={[mockScores, mockScores2]} />
            </DialogContent>
        </Dialog>
    );
}
