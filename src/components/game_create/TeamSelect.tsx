import React from "react";
import PlayerSelect from "./PlayerSelect";
import IPlayer from "../../models/IPlayer";
import {Grid, IconButton, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Person} from "@mui/icons-material";

export type TeamSelectProps = {
    index: number;
    loading: boolean;
    isFull: boolean;
    availablePlayers: IPlayer[];
    selectedPlayers: IPlayer[];
    onNewPlayerCreate: (name: string) => Promise<IPlayer | null>;
    onPlayerAdd: (teamIndex: number, player: IPlayer | null) => void;
    onPlayerRemove: (teamIndex: number, player: IPlayer) => void;
};

function generateList(players: IPlayer[], props: TeamSelectProps) {
    return players.map((player: IPlayer) => (
        <ListItem
            key={player.id}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => props.onPlayerRemove(props.index, player)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemIcon>
                <Person />
            </ListItemIcon>
            <ListItemText primary={player.name} />
        </ListItem>
    ));
}

const TeamSelect: React.FC<TeamSelectProps> = (props: TeamSelectProps) => {
    return (
        <>
            <Grid item xs={12} md={6}>
                <List> {generateList(props.selectedPlayers, props)} </List>
            </Grid>
            {!props.isFull && (
                <PlayerSelect
                    onPlayerAdd={(player: IPlayer | null) => props.onPlayerAdd(props.index, player)}
                    onNewPlayerCreate={async (name: string) => await props.onNewPlayerCreate(name)}
                    players={props.availablePlayers}
                    loading={props.loading}
                />
            )}
        </>
    );
};

export default TeamSelect;
