import * as React from "react";
import IPlayer from "../models/IPlayer";
import {useData} from "./Data";
import ICreateGamePayload from "../models/ICreateGamePayload";
import dataServer from "../database/server";
import useError from "./Error";
import {WebsocketClient} from "../database/websocket";
import {IGame} from "../models/IGame";
import {getCurrEnd, getValidEndList} from "../utility/common";
import {IScorePayload} from "../models/IScorePayload";
import {ScoreParams} from "../components/scoreboard/Scoreboard";

export enum GameType {
    NoGame = -1,
    Cutthroat = 0,
    OneVsOne = 1,
    TwoVsTwo = 2,
    ThreeVsThree = 3,
}
export interface GameTypeInfo {
    teamSize: number;
    teamCount: number;
    name: string;
}

export const gameInfoByType: Map<GameType, GameTypeInfo> = new Map<GameType, GameTypeInfo>([
    [GameType.Cutthroat, {teamSize: 1, teamCount: 3, name: "cutthroat"}],
    [GameType.OneVsOne, {teamSize: 1, teamCount: 2, name: "singles"}],
    [GameType.TwoVsTwo, {teamSize: 2, teamCount: 2, name: "doubles"}],
    [GameType.ThreeVsThree, {teamSize: 3, teamCount: 2, name: "triples"}],
]);

export const endsCountOptions: number[] = [7, 12, 14, 16, 18, 20];
export const bowlsCountOptions: number[] = [2, 3, 4];

export const isTeamFull = (team: IPlayer[], gameType: GameType) => {
    const maxSize = gameInfoByType.get(gameType)?.teamSize;
    return maxSize === undefined ? true : team.length >= maxSize;
};

export const getParticipantString = (gameType: GameType) => {
    const gameInfo = gameInfoByType.get(gameType);
    const maxTeamSize = gameInfo ? gameInfo.teamSize : 0;
    return maxTeamSize > 1 ? "Team" : "Player";
};

const getEmptyTeams = (type: GameType) => {
    return new Array(gameInfoByType.get(type)?.teamCount).fill([]);
};

function getDefaultGameType() {
    return GameType.Cutthroat;
}

function getDefaultEndsCount() {
    return endsCountOptions[endsCountOptions.indexOf(16)];
}

function getDefaultBowlsPerPlayer() {
    return bowlsCountOptions[bowlsCountOptions.indexOf(4)];
}

export function useCreateGame() {
    const [type, setType] = React.useState<GameType>(getDefaultGameType());
    const [teams, setTeams] = React.useState<IPlayer[][]>(getEmptyTeams(getDefaultGameType()));
    const [ends, setEnds] = React.useState<number>(getDefaultEndsCount());
    const [bowls, setBowls] = React.useState<number>(getDefaultBowlsPerPlayer());

    const {request, loading, error} = useData<boolean>();

    const reset = () => {
        setType(getDefaultGameType());
        setTeams(getEmptyTeams(getDefaultGameType()));
        setEnds(getDefaultEndsCount());
        setBowls(getDefaultBowlsPerPlayer());
    };

    const create = async (): Promise<boolean | null> => {
        const ids: number[][] = [];

        for (const team of teams) {
            const teamIds: number[] = [];

            for (const player of team) {
                teamIds.push(player.id);
            }

            ids.push(teamIds);
        }

        const payload: ICreateGamePayload = {
            type,
            teams: ids,
            ends,
            bowls,
        };

        return await request(() => dataServer.createGame(payload));
    };

    React.useEffect(() => {
        setTeams(getEmptyTeams(type));
    }, [type]);

    return {
        reset,
        type,
        setType,
        teams,
        setTeams,
        ends,
        setEnds,
        bowls,
        setBowls,
        create,
        loading,
        error,
    };
}

export const useLiveGame = () => {
    const [game, setGame] = React.useState<IGame | null>(null);
    const gameRef = React.useRef<IGame | null>(null);
    const [loading, setLoading] = React.useState(true);
    const error = useError();

    const setScore = async (params: ScoreParams) => {
        if (!game) return;

        const res = await dataServer.updateScore({gameId: game.id, ...params});

        if (!res.success) {
            error.setErrorMessage(`failed to update score: ${res.errorMessage}`);
            error.toggleActive(true);
        }
    };

    const endGame = async () => {
        if (!game) return;

        const res = await dataServer.endGame(game.id);

        if (!res.success) {
            error.setErrorMessage(res.errorMessage);
            error.toggleActive(true);
        }
    };

    const OnError = (message: string) => {
        error.setErrorMessage(message);
        error.toggleActive(true);
    };

    const OnScoreChanged = (params: IScorePayload) => {
        console.log(gameRef.current);
        if (!gameRef.current) return;

        console.log("score received: ", params);

        const newGame: IGame = {...gameRef.current};
        newGame.scores[params.teamIndex][params.end] = params.value;

        newGame.currEnd = getCurrEnd(newGame);

        if (newGame.type === GameType.Cutthroat) {
            newGame.validEnds = getValidEndList(newGame);
        }

        console.log(newGame);

        setGame(newGame);
    };

    const OnGameChanged = (newGame: IGame) => {
        if (newGame.type !== GameType.NoGame) {
            newGame.currEnd = getCurrEnd(newGame);

            if (newGame.type === GameType.Cutthroat) {
                newGame.validEnds = getValidEndList(newGame);
            }

            setGame(newGame);
        } else {
            setGame(null);
        }

        console.log("game received: ", newGame);
        error.toggleActive(false);
        setLoading(false);
    };

    React.useEffect(() => {
        gameRef.current = game;
    }, [game]);

    React.useEffect(() => {
        console.log("useLiveGame mounted");

        const client = new WebsocketClient();
        client.OnOpen = () => console.log("WebSocket connected");
        client.OnError = OnError;
        client.OnGameChanged = OnGameChanged;
        client.OnScoreChanged = OnScoreChanged;
        client.connect();

        return () => {
            console.log("useLiveGame unmounted");
            client.close();
        };
    }, []);

    return {loading, game, setScore, endGame, error};
};
