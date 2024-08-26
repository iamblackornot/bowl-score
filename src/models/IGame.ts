import {GameType} from "../hooks/Game";
import IPlayer from "./IPlayer";

export interface IGameCommon {
    id: number;
    type: GameType;
    created: Date;
    teams: IPlayer[][];
    ends: number;
    bowls: number;
}

export interface IGame extends IGameCommon {
    scores: number[][];
    currEnd: number;
    validEnds?: boolean[];
}

export interface IGameSummary extends IGameCommon {
    id: number;
    type: GameType;
    created: Date;
    ended: Date;
    teams: IPlayer[][];
    ends: number;
    bowls: number;
    finalScores: number[];
}

export interface GameSummaryPayload {
    games: IGameSummary[];
    page: number;
    totalGames: number;
}
