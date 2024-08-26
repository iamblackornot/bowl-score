import * as React from "react";

import {IGameSummary} from "../../models/IGame";
import {gameInfoByType} from "../../hooks/Game";
import GameInfoItem from "../game/GameInfoItem";
import {timeDiffString} from "../../utility/common";
import {Stack} from "@mui/material";
import DefaultContainer from "../DefaultContainer";

export type GameSummaryInfoProps = {
    game: IGameSummary;
};

export const GameSummaryInfo: React.FC<GameSummaryInfoProps> = ({game}: GameSummaryInfoProps) => {
    return (
        <DefaultContainer>
            <Stack direction="row" spacing={3}>
                <GameInfoItem label="format" text={gameInfoByType.get(game.type)?.name ?? ""} />
                <GameInfoItem label="ends" text={game.ends.toString()} />
                <GameInfoItem label="bowls" text={game.bowls.toString()} />
                <GameInfoItem label="duration" text={timeDiffString(game.created, game.ended)} />
            </Stack>
        </DefaultContainer>
    );
};

export default GameSummaryInfo;
