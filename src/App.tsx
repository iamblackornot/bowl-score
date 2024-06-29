import React from "react";
import {useState} from "react";

import "./App.css";
import {Button} from "@mui/material";
import CreateGameDialog from "./dialogs/CreateGameDialog";

function App() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

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
