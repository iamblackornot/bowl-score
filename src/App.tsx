import {useState} from "react";

import "./App.css";
import {Button, Stack} from "@mui/material";
import CreateGameDialog from "./dialogs/CreateGameDialog";
import Scoreboard, {Scoreboard2} from "./components/scoreboard/Scoreboard";
import SimpleContainer from "./components/scoreboard/SimpleContainer";
import ResponsiveGrid from "./components/scoreboard/ResponsiveGrid";
import EndColumn from "./components/scoreboard/EndColumn";

function App() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {/* <Button
                variant="contained"
                onClick={() => {
                    handleOpen();
                }}
            >
                New game
            </Button>
            <CreateGameDialog key="create_game_dlg" open={open} onClose={handleClose} /> */}
            <Stack direction="row">
                <Scoreboard />
                <EndColumn />
                <Scoreboard2 />
            </Stack>
            {/* <SimpleContainer /> */}
            {/* <SimpleContainer /> */}
            {/* <ResponsiveGrid /> */}
        </>
    );
}

export default App;
