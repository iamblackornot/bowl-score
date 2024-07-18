import React from "react";
import IPlayer from "../../models/IPlayer";
import {Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {PlayerItem2, TeamHeader2} from "./GridItem2";
import {blue} from "@mui/material/colors";

export type TeamRosterProps2 = {
    index: number;
    players: IPlayer[];
};

const TeamRoster2: React.FC<TeamRosterProps2> = (props: TeamRosterProps2) => {
    const teamSize = props.players.length;

    return (
        <Box sx={{bgcolor: blue[100], width: "100%"}}>
            <TeamHeader2 text={`${teamSize > 1 ? "TEAM" : "PL"} ${props.index + 1}`} />
            <Grid container spacing={0.25}>
                {props.players.map((player: IPlayer) => (
                    <Grid key={`player_item_${player.id}`} xs={12}>
                        <PlayerItem2 text={player.name} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TeamRoster2;
