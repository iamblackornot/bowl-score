import IPlayer from "../models/IPlayer";
import IDataProvider from "./dataprovider";
import Result from "./result";
import axios, {AxiosError, AxiosResponse} from "axios";

class ServerDataProvider implements IDataProvider {
    private endpoint: string;
    private port: number;

    constructor(endpoint: string, port: number) {
        this.endpoint = endpoint;
        this.port = port;
    }

    public async getPlayers(): Promise<Result<IPlayer[]>> {
        const requestMethod = async () => await axios.get<IPlayer[]>(`${this.getServerAddress()}/players`);
        return await this.request(requestMethod);
    }

    public async addPlayer(name: string): Promise<Result<IPlayer>> {
        const requestMethod = async () => await axios.post<IPlayer>(`${this.getServerAddress()}/players/add`, {name});
        return await this.request(requestMethod);
    }

    private getServerAddress(): string {
        return `${this.endpoint}:${this.port}`;
    }

    private async request<T>(request_func: () => Promise<AxiosResponse<T>>): Promise<Result<T>> {
        try {
            const res = await request_func();
            return new Result(true, res.data);
        } catch (err) {
            let errMessage = "network error";

            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError;
                errMessage = axiosError.response?.data ? `${axiosError.response.data}` : `${axiosError.message}`;
            }

            return new Result<T>(false, null, errMessage);
        }
    }
}

const dataServer = new ServerDataProvider(
    import.meta.env.VITE_SERVER_ADDRESS ?? "",
    parseInt(import.meta.env.VITE_SERVER_PORT ?? "")
);

export default dataServer;
