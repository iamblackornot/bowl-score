import {Collapse} from "@mui/material";
import {IGameSummary} from "../../models/IGame";
import GameResult from "./GameResult";
import GameSummaryInfo from "./GameSummaryInfo";

export interface GameShortSummaryProps {
    open: boolean;
    game: IGameSummary;
}

const GameShortSummary: React.FC<GameShortSummaryProps> = (props: GameShortSummaryProps) => {
    return (
        <Collapse in={props.open} timeout="auto" unmountOnExit>
            <GameSummaryInfo game={props.game} />
            <GameResult game={props.game} />
        </Collapse>
    );
};

export default GameShortSummary;
