import * as React from "react";
import IPlayer from "../models/IPlayer";

export enum GameType {
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
    [GameType.OneVsOne, {teamSize: 1, teamCount: 2, name: "1 vs 1"}],
    [GameType.TwoVsTwo, {teamSize: 2, teamCount: 2, name: "2 vs 2"}],
    [GameType.ThreeVsThree, {teamSize: 3, teamCount: 2, name: "3 vs 3"}],
]);

export const endsCountOptions: number[] = [9, 11, 15, 18, 21];
export const bowlsCountOptions: number[] = [2, 3, 4, 5, 6];

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
    return endsCountOptions[Math.floor(endsCountOptions.length / 2)];
}

function getDefaultBowlsPerPlayer() {
    return bowlsCountOptions[Math.floor(bowlsCountOptions.length / 2)];
}

function useGameCommon() {
    const [type, setType] = React.useState<GameType>(getDefaultGameType());
    const [teams, setTeams] = React.useState<IPlayer[][]>(getEmptyTeams(getDefaultGameType()));
    const [ends, setEnds] = React.useState<number>(getDefaultEndsCount());
    const [bowls, setBowls] = React.useState<number>(getDefaultBowlsPerPlayer());

    const reset = () => {
        setType(getDefaultGameType());
        setTeams(getEmptyTeams(getDefaultGameType()));
        setEnds(getDefaultEndsCount());
        setBowls(getDefaultBowlsPerPlayer());
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
    };
}

export function useCreateGame() {
    const game = useGameCommon();

    return {
        reset: game.reset,
        type: game.type,
        setType: game.setType,
        teams: game.teams,
        setTeams: game.setTeams,
        ends: game.ends,
        setEnds: game.setEnds,
        bowls: game.bowls,
        setBowls: game.setBowls,
    };
}
