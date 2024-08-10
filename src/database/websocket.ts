import {IGame} from "../models/IGame";
import {IScorePayload} from "../models/IScorePayload";

enum MessageType {
    Error = 0,
    Game = 1,
    Score = 2,
}

interface Message {
    type: MessageType.Game;
    payload: IGame | IScorePayload;
}

export class WebsocketClient {
    private ws?: WebSocket;
    private reconnTimeout?: NodeJS.Timeout;

    public OnOpen?: () => void;
    public OnGameChanged?: (game: IGame) => void;
    public OnScoreChanged?: (score: IScorePayload) => void;
    public OnError?: (message: string) => void;

    public connect() {
        this.ws = new WebSocket(this.getWebsocketAddress());

        this.ws.onopen = () => {
            this.OnOpen?.();
        };

        this.ws.onmessage = (event: MessageEvent) => {
            const message: Message = JSON.parse(event.data);

            console.log("message recieved:", message);

            if (message.type === MessageType.Game) {
                const game = message.payload as IGame;
                game.created = new Date(game.created);
                this.OnGameChanged?.(game);
            } else if (message.type === MessageType.Score) {
                const params = message.payload as IScorePayload;
                console.log("score params:", params);
                this.OnScoreChanged?.(params);
            }
        };

        this.ws.onclose = (event: CloseEvent) => {
            console.log("WebSocket disconnected");
            if (this.ws && !event.wasClean) {
                this.ws.close();
                this.OnError?.("reconnecting");
                const timeout = 5000;
                console.log("WebSocket reconnecting in ", timeout / 1000, " seconds");
                this.reconnTimeout = setTimeout(() => this.connect(), timeout);
            }
        };

        this.ws.onerror = (error) => {
            console.log("failed to connect =", this.ws?.readyState == WebSocket.CLOSED);
            console.log("WebSocket error:", error);

            if (this.ws?.readyState !== WebSocket.CLOSED) {
                this.OnError?.("websocket error");
            }
        };
    }

    public close() {
        clearTimeout(this.reconnTimeout);
        this.ws?.close();
    }

    private getWebsocketAddress(): string {
        const endpoint: string = import.meta.env.VITE_SERVER_ADDRESS ?? "";
        const port = parseInt(import.meta.env.VITE_SERVER_PORT ?? "");
        const regex = /http|https/i;

        return `${endpoint.replace(regex, "ws")}:${port}`;
    }
}
