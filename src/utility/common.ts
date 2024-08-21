import {GameType} from "../hooks/Game";
import {IGame} from "../models/IGame";

export const regularEndValidate = (scores: number[][], end: number) => {
    const teamCount = scores.length;
    let hasScore = false;

    for (let currTeam = 0; currTeam < teamCount && !hasScore; ++currTeam) {
        hasScore ||= scores[currTeam][end] !== 0;
    }
    return hasScore;
};

export const cutthroatEndValidate = (scores: number[][], end: number) => {
    return 10 === endScoreSum(scores, end);
};

export type EndValidationFunc = (scores: number[][], end: number) => boolean;

export const getCurrEnd = (game: IGame) => {
    const endCount = game.scores?.[0]?.length ?? 0;
    const validate: EndValidationFunc = game.type == GameType.Cutthroat ? cutthroatEndValidate : regularEndValidate;

    for (let i = 1; i < endCount; ++i) {
        const currEnd = endCount - 1 - i;
        const isValid = validate(game.scores, currEnd);

        if (isValid) return Math.min(currEnd + 1, endCount - 1);
    }

    return 1;
};

export const endScoreSum = (scores: number[][], end: number) => {
    let sum = 0;
    const teamCount = scores.length;

    for (let currTeam = 0; currTeam < teamCount; ++currTeam) {
        const score = scores[currTeam][end];
        sum += score;
    }

    return sum;
};

export const getValidEndList = (game: IGame) => {
    if (game.type !== GameType.Cutthroat) return undefined;

    return getValidEndListInternal(game.scores, game.ends, cutthroatEndValidate);
};

const getValidEndListInternal = (scores: number[][], endCount: number, validationFunc: EndValidationFunc) => {
    const res: boolean[] = [true];

    for (let i = 1; i < endCount; ++i) {
        res.push(validationFunc(scores, i));
    }

    return res;
};

export const iota = (length: number) => {
    return [...Array(length).keys()];
};

export const toTimeElapsedString = (started: Date) => {
    const now = new Date();
    const elapsed = now.getTime() - started.getTime();

    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor(elapsed / (1000 * 60 * 60));

    if (hours !== 0) return `${hours}h ${minutes}m`;
    if (minutes !== 0) return `${minutes}m`;
    return `${seconds}s`;
};

export function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
    return {...obj1, ...obj2};
}
