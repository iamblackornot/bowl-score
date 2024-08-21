import {Divider, InputLabel, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText} from "@mui/material";
import SimpleModal, {SimpleModalProps} from "./SimpleModal";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export interface EndGameDialogProps extends SimpleModalProps {
    problems: string[];
}

const EndGameDialog: React.FC<EndGameDialogProps> = (props: EndGameDialogProps) => {
    const hasProblems = props.problems.length !== 0;

    return (
        <SimpleModal {...props}>
            <List>
                <ListItem key="statement">
                    <ListItemAvatar>{hasProblems ? <ErrorOutlineIcon /> : <TaskAltIcon />}</ListItemAvatar>
                    <ListItemText>
                        {!hasProblems
                            ? "The game is ready to be ended. No problems found."
                            : "There some problems with the game state:"}
                    </ListItemText>
                </ListItem>
                {/* {hasProblems && <Divider />} */}
                {props.problems.map((problem: string, index: number) => (
                    <ListItem key={`problem_${index}`}>
                        <ListItemIcon>
                            <ArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText>{problem}</ListItemText>
                    </ListItem>
                ))}
                {hasProblems && (
                    <>
                        <Divider />
                        <ListItem key={`note`}>
                            <InputLabel sx={{whiteSpace: "normal"}}>
                                note: you can still ignore them and end the game.
                            </InputLabel>
                        </ListItem>
                    </>
                )}
            </List>
        </SimpleModal>
    );
};

export default EndGameDialog;
