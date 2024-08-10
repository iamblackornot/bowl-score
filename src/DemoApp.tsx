import {useState} from "react";

import "./App.css";
import CreateGameDialog from "./dialogs/CreateGameDialog";
import RegularScoreboardDemo1 from "./dialogs/RegularScoreboardDemo1";
import {Button, Stack} from "@mui/material";
import RegularScoreboardDemo2 from "./dialogs/RegularScoreboardDemo2";

import CutthroatScoreboardDemo from "./dialogs/CutthroatScoreboardDemo";
import MainContainer from "./components/main/MainContainer";

function DemoApp() {
    const [openCreate, setOpenCreate] = useState(false);
    const [openScoredboard1, setOpenScoredboard1] = useState(false);
    const [openScoredboard2, setOpenScoredboard2] = useState(false);
    const [openCutthroatScoredboard, setOpenCutthroatScoredboard] = useState(false);

    return (
        <MainContainer>
            <Stack spacing={2}>
                <Button key="create_game_dlg" variant="contained" onClick={() => setOpenCreate(true)}>
                    Create game
                </Button>
                <CreateGameDialog open={openCreate} onClose={() => setOpenCreate(false)} />

                <Button key="scoreboard_demo_1" variant="contained" onClick={() => setOpenScoredboard1(true)}>
                    Scoreboard v1
                </Button>
                <Button key="scoreboard_demo_2" variant="contained" onClick={() => setOpenScoredboard2(true)}>
                    Scoreboard v2
                </Button>
                <Button
                    key="cutthroat_scoreboard_demo"
                    variant="contained"
                    onClick={() => setOpenCutthroatScoredboard(true)}
                >
                    Scoreboard Cutthroat
                </Button>
            </Stack>
            <RegularScoreboardDemo1 open={openScoredboard1} onClose={() => setOpenScoredboard1(false)} />
            <RegularScoreboardDemo2 open={openScoredboard2} onClose={() => setOpenScoredboard2(false)} />
            <CutthroatScoreboardDemo
                open={openCutthroatScoredboard}
                onClose={() => setOpenCutthroatScoredboard(false)}
            />
        </MainContainer>
    );
}

export default DemoApp;
