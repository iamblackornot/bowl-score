import * as React from "react";

import {IGame} from "../../models/IGame";
import {gameInfoByType} from "../../hooks/Game";
import GameInfoItem from "./GameInfoItem";
import {toTimeElapsedString} from "../../utility/common";
import {Stack} from "@mui/material";
import DefaultContainer from "../DefaultContainer";

export type GameInfoProps = {
    game: IGame;
};

export const GameInfo: React.FC<GameInfoProps> = ({game}: GameInfoProps) => {
    const [elapsed, setElapsed] = React.useState<string>(toTimeElapsedString(game.created));

    React.useEffect(() => {
        const interval = setInterval(() => setElapsed(toTimeElapsedString(game.created)), 1000);
        return () => clearInterval(interval);
    });

    return (
        <DefaultContainer>
            <Stack direction="row" spacing={3}>
                {/* <GameInfoItem label="id" text={game.id.toString()} /> */}
                <GameInfoItem label="format" text={gameInfoByType.get(game.type)?.name ?? ""} />
                <GameInfoItem label="ends" text={game.ends.toString()} />
                <GameInfoItem label="bowls" text={game.bowls.toString()} />
                <GameInfoItem label="elapsed" text={elapsed} />
            </Stack>
        </DefaultContainer>
    );
};

export default GameInfo;
