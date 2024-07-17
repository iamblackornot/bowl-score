import {useState} from "react";

import "./App.css";
import CreateGameDialog from "./dialogs/CreateGameDialog";
import RegularScoreboardDemo1 from "./dialogs/RegularScoreboardDemo1";
import {Button, Stack} from "@mui/material";

function App() {
    const [openCreate, setOpenCreate] = useState(false);
    const [openScoredboard1, setOpenScoredboard1] = useState(false);

    return (
        <>
            <Button key="create_game_dlg" variant="contained" onClick={() => setOpenCreate(true)}>
                Create game
            </Button>
            <CreateGameDialog open={openCreate} onClose={() => setOpenCreate(false)} />

            <Button key="scoreboard_demo_1" variant="contained" onClick={() => setOpenScoredboard1(true)}>
                Scoreboard v1
            </Button>
            <RegularScoreboardDemo1 open={openScoredboard1} onClose={() => setOpenScoredboard1(false)} />

            {/* <SimpleContainer /> */}
            {/* <SimpleContainer /> */}
            {/* <ResponsiveGrid /> */}
        </>
    );
}

export default App;
