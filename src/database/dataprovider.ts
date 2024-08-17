import ICreateGamePayload from "../models/ICreateGamePayload";
import IPlayer from "../models/IPlayer";
import {IScorePayload} from "../models/IScorePayload";
import {IToken} from "../models/IToken";
import Result from "./result";

export default interface IDataProvider {
    refreshToken(): Promise<Result<IToken>>;
    login(username: string, password: string): Promise<Result<IToken>>;
    logout(): Promise<Result<null>>;

    getPlayers(): Promise<Result<IPlayer[]>>;
    addPlayer(name: string): Promise<Result<IPlayer>>;

    createGame(params: ICreateGamePayload): Promise<Result<boolean>>;
    updateScore(params: IScorePayload): Promise<Result<null>>;
    endGame(id: number): Promise<Result<null>>;

    sendError(message: string): Promise<Result<null>>;
}
