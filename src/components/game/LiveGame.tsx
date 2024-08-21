import React, {useContext} from "react";
import {Fab, Stack} from "@mui/material";
import GameInfo from "./GameInfo";
import Scoreboard, {ScoreParams} from "../scoreboard/Scoreboard";
import {IGame} from "../../models/IGame";
import {GameType} from "../../hooks/Game";
import CutthroatScoreboard from "../scoreboard/CutthroatScoreboard";
import {AuthContext} from "../../hooks/Auth";
import EndGameDialog from "../../dialogs/EndGameDialog";
import dataServer from "../../database/server";
import ErrorNotification from "../ErrorNotification";

export type LiveGameProps = {
    game: IGame;
    onScoreChange?: (scores: ScoreParams[]) => void;
    onEndGame?: () => void;
};

type EndGameButtonProps = {
    OnClick?: () => void;
};

const EndGameButton: React.FC<EndGameButtonProps> = (props: EndGameButtonProps) => {
    return (
        <Fab
            variant="extended"
            size="medium"
            color="primary"
            sx={{width: "fit-content", marginBottom: "1.5rem !important"}}
            onClick={() => props.OnClick?.()}
        >
            End game
        </Fab>
    );
};

const LiveGame: React.FC<LiveGameProps> = (props: LiveGameProps) => {
    const auth = useContext(AuthContext);

    const [openEndGameDlg, setOpenEndGameDlg] = React.useState(false);
    const [problems, setProblems] = React.useState<string[]>([]);
    const [showError, setShowError] = React.useState(false);

    React.useEffect(() => {
        console.log("LiveGame mounted");
        return () => console.log("LiveGame unmounted");
    });

    const OnEndGameClick = async () => {
        setShowError(false);
        const res = await dataServer.validateGame();

        if (res.success && res.data) {
            console.log(res.data);
            setProblems(res.data);
            setOpenEndGameDlg(true);
        } else {
            setShowError(true);
        }
    };

    const OnEndGameConfirm = () => {
        setOpenEndGameDlg(false);
        props.onEndGame?.();
    };

    const OnEndGameCancel = () => {
        setOpenEndGameDlg(false);
    };

    return (
        <Stack spacing={2} display="flex" alignItems="center">
            <Stack>
                <GameInfo game={props.game} />
                {props.game.type !== GameType.Cutthroat && (
                    <Scoreboard game={props.game} onScoreChange={props.onScoreChange} />
                )}
                {props.game.type === GameType.Cutthroat && (
                    <CutthroatScoreboard game={props.game} onScoreChange={props.onScoreChange} />
                )}
            </Stack>
            {auth.isAuthed && <EndGameButton OnClick={OnEndGameClick} />}
            <EndGameDialog
                open={openEndGameDlg}
                title={"Confirm game end"}
                problems={problems}
                onConfirm={OnEndGameConfirm}
                onCancel={OnEndGameCancel}
            />
            <ErrorNotification
                opened={showError}
                message={"failed to validate game state"}
                onClose={() => setShowError(false)}
            />
        </Stack>
    );
};

export default LiveGame;
