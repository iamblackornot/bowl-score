export const getCurrEnd = (scores: number[][]) => {
    const teamCount = scores.length;
    const endCount = scores?.[0]?.length ?? 0;

    for (let currEnd = 1; currEnd < endCount; ++currEnd) {
        let hasScore = false;

        for (let currTeam = 0; currTeam < teamCount && !hasScore; ++currTeam) {
            hasScore ||= scores[currTeam][currEnd] !== 0;
        }

        if (!hasScore) return currEnd;
    }

    return Math.max(0, endCount - 1);
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

export const cutthroatEndValidate = (scores: number[][], end: number) => {
    return 10 === endScoreSum(scores, end);
};

export const getCutthroatCurrEnd = (scores: number[][]) => {
    const endCount = scores?.[0]?.length ?? 0;

    for (let i = 1; i < endCount; ++i) {
        const currEnd = endCount - 1 - i;
        const isValid = cutthroatEndValidate(scores, currEnd);

        if (isValid) return Math.min(currEnd + 1, endCount - 1);
    }

    return 1;
};

export type EndValidationFunc = (scores: number[][], end: number) => boolean;

export const getValidEndList = (scores: number[][], endCount: number, validationFunc: EndValidationFunc) => {
    const res: boolean[] = [true];

    for (let i = 1; i < endCount; ++i) {
        res.push(validationFunc(scores, i));
    }

    return res;
};

export const iota = (length: number) => {
    return [...Array(length).keys()];
};
