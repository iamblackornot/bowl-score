import * as React from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import {IGameSummary} from "../../models/IGame";
import {gameInfoByType} from "../../hooks/Game";
import GameShortSummary from "./GameShortSummary";

export interface GameHistoryRowProps {
    game: IGameSummary;
}

const GameHistoryRow: React.FC<GameHistoryRowProps> = (props: GameHistoryRowProps) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Los_Angeles",
        timeZoneName: "short",
    });
    const timestampCaption = `${formatter.format(props.game.created)}`;

    return (
        <>
            <ListItemButton onClick={handleClick} sx={{backgroundColor: open ? "#e6e6e6;" : "transparent"}}>
                <ListItemText
                    primary={gameInfoByType.get(props.game.type)?.name.toLocaleUpperCase()}
                    secondary={timestampCaption}
                    sx={{
                        textAlign: "center",
                        "& .MuiListItemText-primary": {
                            fontWeight: 600,
                        },
                        paddingLeft: "16px",
                        paddingRight: "16px",
                    }}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <GameShortSummary open={open} game={props.game} />
        </>
    );
};

export default GameHistoryRow;
