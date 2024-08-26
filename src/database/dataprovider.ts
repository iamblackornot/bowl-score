import ICreateGamePayload from "../models/ICreateGamePayload";
import {GameSummaryPayload} from "../models/IGame";
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
    validateGame(): Promise<Result<string[]>>;
    getGameHistory(page: number, pageSize: number): Promise<Result<GameSummaryPayload>>;

    sendError(message: string): Promise<Result<null>>;
}
