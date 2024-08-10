import ICreateGamePayload from "../models/ICreateGamePayload";
import IPlayer from "../models/IPlayer";
import {IScorePayload} from "../models/IScorePayload";
import Result from "./result";

export default interface IDataProvider {
    getPlayers(): Promise<Result<IPlayer[]>>;
    addPlayer(name: string): Promise<Result<IPlayer>>;
    createGame(params: ICreateGamePayload): Promise<Result<boolean>>;
    sendError(message: string): Promise<Result<null>>;
    updateScore(params: IScorePayload): Promise<Result<null>>;
}
