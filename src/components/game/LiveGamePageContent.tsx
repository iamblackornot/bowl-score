import React, {useEffect} from "react";
import {ScoreParams} from "../scoreboard/Scoreboard";
import {useLiveGame} from "../../hooks/Game";
import LoadingGameStub from "./LoadingGameStub";
import LiveGame from "./LiveGame";
import ErrorNotification from "../ErrorNotification";
import NoLiveGame from "./NoLiveGame";

const LiveGamePageContent: React.FC = () => {
    const live = useLiveGame();

    useEffect(() => {
        console.log("LiveGamePageContent mounted");
        return () => console.log("LiveGamePageContent unmounted");
    });

    const onScoreChange = (scores: ScoreParams[]) => {
        if (!live.game) return;
        if (scores.length === 0) return;

        for (const params of scores) {
            const prevScores = live.game.scores[params.teamIndex][params.end];

            if (prevScores !== params.value) {
                live.setScore(params);
            }
        }
    };

    const onEndGame = () => {
        live.endGame();
    };

    const content = (() => {
        if (live.loading) return <LoadingGameStub />;
        if (!live.game) return <NoLiveGame />;

        return <LiveGame game={live.game} onScoreChange={onScoreChange} onEndGame={onEndGame} />;
    })();

    return (
        <>
            {content}
            <ErrorNotification
                opened={live.error.active}
                message={live.error.errorMessage}
                onClose={() => live.error.toggleActive(false)}
            />
        </>
    );
};

export default LiveGamePageContent;
