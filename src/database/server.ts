import ICreateGamePayload from "../models/ICreateGamePayload";
import IPlayer from "../models/IPlayer";
import {IScorePayload} from "../models/IScorePayload";
import IDataProvider from "./dataprovider";
import Result from "./result";
import axios, {AxiosInstance, AxiosResponse, HttpStatusCode, InternalAxiosRequestConfig} from "axios";
import {IToken} from "../models/IToken";
import {GameSummaryPayload} from "../models/IGame";

interface Config extends InternalAxiosRequestConfig {
    logsWereSent?: boolean;
    refreshTokenWasSent?: boolean;
}

class ServerDataProvider implements IDataProvider {
    private publicInstance: AxiosInstance;
    private privateInstance: AxiosInstance;
    private baseUrl: string;

    constructor(endpoint: string, port: number) {
        this.baseUrl = this.getServerAddress(endpoint, port);

        this.publicInstance = axios.create({baseURL: this.baseUrl, withCredentials: true});
        this.publicInstance.interceptors.response.use(this.defaultResponseHandle, this.defaultErrorHandle);

        this.privateInstance = axios.create({baseURL: this.baseUrl, withCredentials: true});
        this.privateInstance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
            return config;
        });

        this.privateInstance.interceptors.response.use(this.defaultResponseHandle, async (error) => {
            const config = error.config as Config;
            if (config && error.response?.status == HttpStatusCode.Unauthorized && !config.refreshTokenWasSent) {
                config.refreshTokenWasSent = true;

                const res = await this.refreshToken();

                if (res.success && res.data) {
                    localStorage.setItem("accessToken", res.data?.access);
                    return this.privateInstance.request(config);
                } else if (!res.success) {
                    if (res.errorMessage) {
                        error.data = new Result(false, null, "failed to refresh token");
                    } else {
                        error.data = new Result(false, null, "unauthorized");
                    }

                    return error;
                }
            } else if (config && error.response?.status == HttpStatusCode.Unauthorized && config.refreshTokenWasSent) {
                error.data = new Result(false, null, "unauthorized");
                return error;
            }

            return this.defaultErrorHandle(error);
        });
    }

    private async defaultResponseHandle(response: AxiosResponse) {
        response.data = new Result(response.status === HttpStatusCode.Ok, response.data);
        return response;
    }

    private defaultErrorHandle = async (error: any) => {
        let errMessage = "network error";

        if (axios.isAxiosError(error)) {
            errMessage = error.response?.data?.message ?? `${error.message}`;

            if (error.response?.status !== HttpStatusCode.Unauthorized) {
                const config = error.config as Config;
                if (config && !config.logsWereSent) {
                    config.params = {};
                    config.logsWereSent = true;
                    await this.publicInstance.post(`/log`, {message: error.message}, error.config);
                }
            }
        }

        error.data = new Result(false, null, errMessage);

        return error;
    };

    public async refreshToken(): Promise<Result<IToken>> {
        const res = await this.publicInstance.post<Result<IToken>>("/auth/refresh");

        if (axios.isAxiosError(res) && res.response?.status === HttpStatusCode.Unauthorized) return new Result(false);

        return res.data;
    }

    public async login(username: string, password: string): Promise<Result<IToken>> {
        const res = await this.publicInstance.post<Result<IToken>>("/auth/login", {username, password});
        return res.data;
    }

    public async logout(): Promise<Result<null>> {
        const res = await this.publicInstance.post<Result<null>>("/auth/logot");
        return res.data;
    }

    public async getPlayers(): Promise<Result<IPlayer[]>> {
        const res = await this.privateInstance.get<Result<IPlayer[]>>("/players");
        return res.data;
    }

    public async addPlayer(name: string): Promise<Result<IPlayer>> {
        const res = await this.privateInstance.post<Result<IPlayer>>("/players/add", {name});
        return res.data;
    }

    public async createGame(params: ICreateGamePayload): Promise<Result<boolean>> {
        const res = await this.privateInstance.post<Result<boolean>>("/game/create", params);
        res.data.data = res.data.success;
        return res.data;
    }

    public async sendError(message: string): Promise<Result<null>> {
        const res = await this.publicInstance.post("/log", message);
        return res.data;
    }

    public async updateScore(params: IScorePayload): Promise<Result<null>> {
        const res = await this.privateInstance.post("/game/score", params);
        return res.data;
    }

    public async endGame(id: number): Promise<Result<null>> {
        const res = await this.privateInstance.post("/game/end", {id});
        return res.data;
    }

    public async validateGame(): Promise<Result<string[]>> {
        const res = await this.privateInstance.post("/game/validate");
        return new Result(res.data.success, res.data.data.problems, res.data.errorMessage);
    }

    public async getGameHistory(page: number, pageSize: number): Promise<Result<GameSummaryPayload>> {
        const res = await this.publicInstance.get("/game/history", {params: {page, pageSize}});
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
