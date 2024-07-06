import React from "react";
import {useState} from "react";

import "./App.css";
import {Button} from "@mui/material";
import CreateGameDialog from "./dialogs/CreateGameDialog";

function App() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                variant="contained"
                onClick={() => {
                    handleOpen();
                }}
            >
                Click me
            </Button>
            <CreateGameDialog key="create_game_dlg" open={open} onClose={handleClose} />
        </>
    );
}

export default App;
