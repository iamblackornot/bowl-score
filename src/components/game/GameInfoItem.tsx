import {InputLabel, Stack, Typography} from "@mui/material";

export type GameInfoItemProps = {
    label: string;
    text: string;
};

const GameInfoItem: React.FC<GameInfoItemProps> = (props: GameInfoItemProps) => {
    return (
        <Stack direction="column">
            <InputLabel
                size="normal"
                sx={{
                    textAlign: "center",
                }}
            >
                {props.label}
            </InputLabel>
            <Typography variant="h6" fontWeight={700} fontSize="1rem">
                {" "}
                {props.text}
            </Typography>
        </Stack>
    );
};
export default GameInfoItem;
