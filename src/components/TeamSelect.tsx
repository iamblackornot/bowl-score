import React from "react";
import PlayerSelect from "./PlayerSelect";
import IPlayer from "../models/IPlayer";
import {Grid, IconButton, List, ListItem, ListItemText} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export type TeamSelectProps = {
    index: number;
    players: IPlayer[];
    playersAlreadySelected: Set<number>;
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
            <ListItemText primary={player.name} />
        </ListItem>
    ));
}

const TeamSelect: React.FC<TeamSelectProps> = (props: TeamSelectProps) => {
    return (
        <>
            <PlayerSelect
                onPlayerAdd={(player: IPlayer | null) => props.onPlayerAdd(props.index, player)}
                playersAlreadySelected={props.playersAlreadySelected}
            />
            {/* <TeamList players={props.players} onPlayerRemove={props.onPlayerRemove} /> */}
            <Grid item xs={12} md={6}>
                <List> {generateList(props.players, props)} </List>
            </Grid>
        </>
    );
};

export default TeamSelect;
