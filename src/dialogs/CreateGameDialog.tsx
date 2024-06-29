import * as React from "react";

import Button from "@mui/material/Button";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import TeamSelect from "../components/TeamSelect";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import IPlayer from "../models/IPlayer";
import {useCreateGame} from "../hooks/Game";

export interface ConfirmationDialogRawProps {
    open: boolean;
    onClose: (value?: string) => void;
}

export default function CreateGameDialog(props: ConfirmationDialogRawProps) {
    const {onClose, open} = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const game = useCreateGame();

    const onTeamPlayerAdd = (teamIndex: number, player: IPlayer | null) => {
        if (player) {
            game.setTeams((teams: IPlayer[][]) => {
                const newTeams = [...teams];
                newTeams[teamIndex] = [...newTeams[teamIndex], player];
                return newTeams;
            });
        }
    };

    const onTeamPlayerRemove = (teamIndex: number, player: IPlayer | null) => {
        if (player) {
            game.setTeams((teams: IPlayer[][]) => {
                const newTeams = [...teams];
                newTeams[teamIndex] = newTeams[teamIndex].filter((item) => item.id !== player.id);
                return newTeams;
            });
        }
    };

    const createAlreadySelectedSet = () => {
        const set: Set<number> = new Set<number>();

        for (const team of game.teams) {
            if (team) {
                for (const player of team) {
                    set.add(player.id);
                }
            }
        }

        return set;
    };

    function generateTeamSelectionList() {
        const alreadySelected = createAlreadySelectedSet();

        return game.teams.map((team: IPlayer[], index: number) => (
            <React.Fragment key={`team_select_fragment_${index}`}>
                <DialogTitle>Team {index + 1}</DialogTitle>
                <DialogContent dividers>
                    <TeamSelect
                        key={index}
                        index={index}
                        players={team}
                        onPlayerAdd={onTeamPlayerAdd}
                        onPlayerRemove={onTeamPlayerRemove}
                        playersAlreadySelected={alreadySelected}
                    />
                </DialogContent>
            </React.Fragment>
        ));
    }

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose();
    };

    return (
        <Dialog
            sx={{"& .MuiDialog-paper": {width: "100%"}}}
            maxWidth="xs"
            fullScreen={fullScreen}
            open={open}
            scroll={"body"}
        >
            <DialogTitle>Phone Ringtone</DialogTitle>
            {generateTeamSelectionList()}
            <DialogActions>
                <Button variant="outlined" autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleOk}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
