import {GameType} from "../hooks/Game";
import IPlayer from "./IPlayer";

export interface IGame {
    id: number;
    type: GameType;
    created: Date;
    teams: IPlayer[][];
    ends: number;
    bowls: number;
    scores: number[][];
    currEnd: number;
    validEnds?: boolean[];
}
