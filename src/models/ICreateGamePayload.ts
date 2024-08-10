import {GameType} from "../hooks/Game";

export default interface ICreateGamePayload {
    type: GameType;
    teams: number[][];
    ends: number;
    bowls: number;
}
