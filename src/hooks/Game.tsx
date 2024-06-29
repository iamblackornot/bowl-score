import * as React from "react";
import IPlayer from "../models/IPlayer";

export enum GameType {
    Cutthroat = 0,
    OneVsOne = 1,
    TwoVsTwo = 2,
    ThreeVsThree = 3,
}

export const teamSizeByGameType: Map<GameType, number> = new Map<GameType, number>([
    [GameType.Cutthroat, 1],
    [GameType.OneVsOne, 1],
    [GameType.TwoVsTwo, 2],
    [GameType.ThreeVsThree, 3],
]);

export const teamCountByGameType: Map<GameType, number> = new Map<GameType, number>([
    [GameType.Cutthroat, 3],
    [GameType.OneVsOne, 2],
    [GameType.TwoVsTwo, 2],
    [GameType.ThreeVsThree, 2],
]);

function useGameCommon() {
    const [type, setType] = React.useState<GameType>(GameType.ThreeVsThree);
    const [teams, setTeams] = React.useState<IPlayer[][]>(new Array(teamCountByGameType.get(type)).fill([]));

    return {
        type,
        setType,
        teams,
        setTeams,
    };
}

export function useCreateGame() {
    const game = useGameCommon();

    return {
        type: game.type,
        setType: game.setType,
        teams: game.teams,
        setTeams: game.setTeams,
    };
}
