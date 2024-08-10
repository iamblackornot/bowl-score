import {Divider, InputLabel, Stack, Typography} from "@mui/material";

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
            {/* <Divider /> */}
            <Typography variant="h6" fontWeight={700}>
                {" "}
                {props.text}
            </Typography>
        </Stack>
    );
};
export default GameInfoItem;
