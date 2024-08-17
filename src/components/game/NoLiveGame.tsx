import {Fab, Stack, Typography} from "@mui/material";
import React, {useContext} from "react";
import DefaultContainer from "../DefaultContainer";
import AddIcon from "@mui/icons-material/Add";
import CreateGameDialog from "../../dialogs/CreateGameDialog";
import {AuthContext} from "../../hooks/Auth";

type CreateGameButtonProps = {
    OnClick?: () => void;
};

const CreateGameButton: React.FC<CreateGameButtonProps> = (props: CreateGameButtonProps) => {
    return (
        <Fab
            variant="extended"
            size="medium"
            color="primary"
            sx={{width: "fit-content"}}
            onClick={() => props.OnClick?.()}
        >
            <AddIcon sx={{mr: 1}} />
            Create game
        </Fab>
    );
};

const NoLiveGame: React.FC = () => {
    const [dlgOpen, setDlgOpen] = React.useState(false);
    const auth = useContext(AuthContext);

    return (
        <>
            <DefaultContainer sx={{height: "100%", padding: "0px !important", alignItems: "center"}}>
                <Stack spacing={4} alignItems="center">
                    <Typography variant="h5">No live game is running</Typography>
                    {auth.isAuthed && <CreateGameButton OnClick={() => setDlgOpen(true)} />}
                </Stack>
            </DefaultContainer>
            <CreateGameDialog open={dlgOpen} onClose={() => setDlgOpen(false)} />
        </>
    );
};

export default NoLiveGame;
