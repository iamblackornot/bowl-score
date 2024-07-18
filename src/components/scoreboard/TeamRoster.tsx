import React from "react";
import IPlayer from "../../models/IPlayer";
import {Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {PlayerItem, TeamHeader} from "./GridItem";
import {blue} from "@mui/material/colors";
import useMedia from "../../hooks/Media";

export type TeamRosterProps = {
    index: number;
    players: IPlayer[];
};

const TeamRoster: React.FC<TeamRosterProps> = (props: TeamRosterProps) => {
    const teamSize = props.players.length;
    const {isSmallScreen} = useMedia();

    return (
        <Box sx={{bgcolor: blue[100]}}>
            <TeamHeader text={`${teamSize > 1 ? "TEAM" : "PL"} ${props.index + 1}`} />
            <Grid container spacing={0.25}>
                {props.players.map((player: IPlayer) => (
                    <Grid key={`player_item_${player.id}`} xs={isSmallScreen ? Math.floor(12 / teamSize) : 12}>
                        <PlayerItem text={player.name} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TeamRoster;
