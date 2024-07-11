import * as React from "react";

import Button from "@mui/material/Button";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import {
    DialogContentText,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    useMediaQuery,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";

import ErrorNotification from "../components/ErrorNotification";
import TeamSelect from "../components/TeamSelect";

import IPlayer from "../models/IPlayer";
import {
    GameType,
    bowlsCountOptions,
    endsCountOptions,
    gameInfoByType,
    getParticipantString,
    isTeamFull,
    useCreateGame,
} from "../hooks/Game";
import usePlayers from "../hooks/Players";
import ToggleSelect, {ToggleSelectOption} from "../components/ToggleSelect";
import SimpleModal from "./SimpleModal";
import {Person} from "@mui/icons-material";

export interface ConfirmationDialogRawProps {
    open: boolean;
    onClose: (value?: string) => void;
}

export default function CreateGameDialog(props: ConfirmationDialogRawProps) {
    const {onClose, open} = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [confirmModalOpen, setConfirmModalOpen] = React.useState<boolean>(false);
    const [cancelModalOpen, setCancelModalOpen] = React.useState<boolean>(false);
    const [teamNotFullActive, toggleTeamNotFullActive] = React.useState<boolean>(false);

    const game = useCreateGame();
    const players = usePlayers();

    React.useEffect(() => {
        if (open && players.data === null && !players.loading) {
            players.loadPlayers();
        }
    }, [open, players]);

    const handleEntering = React.useCallback(() => {
        const dialog = document.querySelector(".MuiDialog-container");
        if (dialog) {
            dialog.scrollTop = 0;
        }
        const dialog2 = document.querySelector(".MuiDialog-paperScrollBody");
        if (dialog2) {
            dialog2.scrollTop = 0;
        }
    }, []);

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

    const onNewPlayerCreate = async (name: string) => {
        return await players.addPlayer(name);
    };

    const getAvailablePlayers = () => {
        if (!players.data) {
            return [];
        }

        return players.data?.filter((player: IPlayer) => {
            for (const team of game.teams) {
                if (team && team.indexOf(player) !== -1) {
                    return false;
                }
            }

            return true;
        });
    };

    const OnGameTypeChanged = (type: GameType) => {
        game.setType(type);
    };

    const OnEndsCountChanged = (value: number) => {
        game.setEnds(value);
    };

    const OnBowlsCountChanged = (value: number) => {
        game.setBowls(value);
    };

    const generateTypeOptions = () => {
        const options: ToggleSelectOption<GameType>[] = [];

        for (const [type, info] of gameInfoByType) {
            options.push({value: type, label: info.name});
        }

        return options;
    };

    const generateEndOptions = () => {
        const options: ToggleSelectOption<number>[] = [];

        for (const count of endsCountOptions) {
            options.push({value: count, label: count.toString()});
        }

        return options;
    };

    const generateBowlsOptions = () => {
        const options: ToggleSelectOption<number>[] = [];

        for (const count of bowlsCountOptions) {
            options.push({value: count, label: count.toString()});
        }

        return options;
    };

    function generateTeamSelectionList() {
        const availablePlayers = getAvailablePlayers();

        return game.teams.map((team: IPlayer[], index: number) => (
            <React.Fragment key={`team_select_fragment_${index}`}>
                <DialogTitle>
                    {getParticipantString(game.type)} {index + 1}
                </DialogTitle>
                <DialogContent dividers>
                    <TeamSelect
                        key={index}
                        index={index}
                        isFull={isTeamFull(game.teams[index], game.type)}
                        loading={players.loading}
                        availablePlayers={availablePlayers}
                        selectedPlayers={team}
                        onPlayerAdd={onTeamPlayerAdd}
                        onPlayerRemove={onTeamPlayerRemove}
                        onNewPlayerCreate={onNewPlayerCreate}
                    />
                </DialogContent>
            </React.Fragment>
        ));
    }

    const getNewGameSummaryContent = () => {
        const elements: JSX.Element[] = [];

        elements.push(<ListItemText key="game_mode" primary="Game mode" secondary={GameType[game.type]} />);
        elements.push(<Divider key="divider_game_mode" />);
        elements.push(<ListItemText key="ends_count" primary="Ends count" secondary={game.ends} />);
        elements.push(<Divider key="divider_ends_count" />);
        elements.push(<ListItemText key="bowls_per_player" primary="Bowls per player" secondary={game.bowls} />);

        const teamElements = [];

        for (let i = 0; i < game.teams.length; ++i) {
            teamElements.push(
                <ListItemText key={`team_name_${i}`}>
                    {getParticipantString(game.type)} {i + 1}
                </ListItemText>
            );
            teamElements.push(<Divider key={`team_${i}_divider`} />);

            for (const player of game.teams[i]) {
                let playerNum = 0;

                teamElements.push(
                    <ListItem key={`team_${i}_player_${playerNum}`}>
                        <ListItemIcon key={`team_${i}_player_${playerNum}_icon`}>
                            <Person />
                        </ListItemIcon>
                        <ListItemText key={`team_${i}_player_${playerNum}_name`} secondary={player.name} />
                    </ListItem>
                );

                ++playerNum;
            }
        }

        elements.push(<List key="teams_list">{teamElements}</List>);
        return <List key="game_summary">{elements}</List>;
    };

    const areTeamsFull = () => {
        for (const team of game.teams) {
            if (!isTeamFull(team, game.type)) {
                return false;
            }
        }

        return true;
    };

    const onConfirmModalConfirm = () => {
        setConfirmModalOpen(false);
        game.reset();
        onClose();
    };

    const onConfirmModalCancel = () => {
        setConfirmModalOpen(false);
    };

    const onCancelModalConfirm = () => {
        setCancelModalOpen(false);
        game.reset();
        onClose();
    };

    const onCancelModalCancel = () => {
        setCancelModalOpen(false);
    };

    const handleCancel = () => {
        setCancelModalOpen(true);
    };

    const handleCreate = () => {
        if (areTeamsFull()) {
            setConfirmModalOpen(true);
        } else {
            toggleTeamNotFullActive(true);
        }
    };

    return (
        <Dialog
            sx={{"& .MuiDialog-paper": {width: "100%"}}}
            maxWidth="xs"
            fullScreen={fullScreen}
            open={open}
            scroll={"body"}
            disableScrollLock={false}
            TransitionProps={{onEntering: handleEntering}}
        >
            <DialogTitle>Set up new game</DialogTitle>
            <DialogContent dividers>
                <Stack direction={"column"} spacing={2}>
                    <ToggleSelect
                        label="game mode"
                        options={generateTypeOptions()}
                        value={game.type}
                        OnValueChanged={OnGameTypeChanged}
                    />
                    <ToggleSelect
                        label="ends count"
                        options={generateEndOptions()}
                        value={game.ends}
                        OnValueChanged={OnEndsCountChanged}
                    />
                    <ToggleSelect
                        label="bowls per player"
                        options={generateBowlsOptions()}
                        value={game.bowls}
                        OnValueChanged={OnBowlsCountChanged}
                    />
                </Stack>
            </DialogContent>
            {generateTeamSelectionList()}
            <DialogActions>
                <Button variant="outlined" autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleCreate}>
                    Create
                </Button>
            </DialogActions>
            <SimpleModal
                open={confirmModalOpen}
                title="Confirm game creation"
                content={getNewGameSummaryContent()}
                onConfirm={onConfirmModalConfirm}
                onCancel={onConfirmModalCancel}
            />
            <SimpleModal
                open={cancelModalOpen}
                title="You are about to cancel game creation"
                content={<DialogContentText>Are you sure?</DialogContentText>}
                onConfirm={onCancelModalConfirm}
                onCancel={onCancelModalCancel}
            />
            <ErrorNotification
                opened={teamNotFullActive}
                message="not enough players selected"
                onClose={() => toggleTeamNotFullActive(false)}
            />
            <ErrorNotification
                opened={players.error.active}
                message={players.error.errorMessage}
                onClose={() => players.error.toggleActive(false)}
            />
        </Dialog>
    );
}
