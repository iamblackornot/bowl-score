import ICreateGamePayload from "../models/ICreateGamePayload";
import IPlayer from "../models/IPlayer";
import {IScorePayload} from "../models/IScorePayload";
import IDataProvider from "./dataprovider";
import Result from "./result";
import axios, {AxiosError, AxiosInstance, HttpStatusCode} from "axios";

class ServerDataProvider implements IDataProvider {
    private publicInstance: AxiosInstance;

    constructor(endpoint: string, port: number) {
        const baseUrl = this.getServerAddress(endpoint, port);
        this.publicInstance = axios.create({baseURL: baseUrl});

        this.publicInstance.interceptors.response.use(
            (response) => {
                response.data = new Result(response.status === HttpStatusCode.Ok, response.data);
                return response;
            },
            async (error) => {
                if (error.config && !error.config.logsWereSent) {
                    error.config.logsWereSent = true;
                    await this.publicInstance.post(`/log`, {message: error.message}, error.config);
                }

                let errMessage = "network error";

                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    errMessage = axiosError.response?.data ? `${axiosError.response.data}` : `${axiosError.message}`;
                }

                error.data = new Result(false, null, errMessage);

                return error;
            }
        );
    }

    public async getPlayers(): Promise<Result<IPlayer[]>> {
        const res = await this.publicInstance.get<Result<IPlayer[]>>("/players");
        return res.data;
    }

    public async addPlayer(name: string): Promise<Result<IPlayer>> {
        const res = await this.publicInstance.post<Result<IPlayer>>("/players/add", {name});
        return res.data;
    }

    public async createGame(params: ICreateGamePayload): Promise<Result<boolean>> {
        const res = await this.publicInstance.post<Result<boolean>>("/game/create", params);
        res.data.data = res.data.success;
        return res.data;
    }

    public async sendError(message: string): Promise<Result<null>> {
        const res = await this.publicInstance.post("/log", message);
        return res.data;
    }

    public async updateScore(params: IScorePayload): Promise<Result<null>> {
        const res = await this.publicInstance.post("/game/score", params);
        return res.data;
    }

    private getServerAddress(endpoint: string, port: number): string {
        return `${endpoint}:${port}`;
    }
}

const dataServer: IDataProvider = new ServerDataProvider(
    import.meta.env.VITE_SERVER_ADDRESS ?? "",
    parseInt(import.meta.env.VITE_SERVER_PORT ?? "")
);

export default dataServer;
