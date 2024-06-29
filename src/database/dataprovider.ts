import IPlayer from "../models/IPlayer";
import Result from "./result";

export default interface IDataProvider {
    getPlayers(): Promise<Result<IPlayer[]>>;
    addPlayer(name: string): Promise<Result<IPlayer>>;
}
