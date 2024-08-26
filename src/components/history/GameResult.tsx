import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {IGameSummary} from "../../models/IGame";
import {Stack, SxProps, Theme, Typography} from "@mui/material";
import {useTheme} from "@mui/material";

export interface GameResultProps {
    game: IGameSummary;
}

function maxScoreIndexes(values: number[]) {
    let max = 1;
    let indexes: number[] = [-1];

    for (let i = 0; i < values.length; i++) {
        if (values[i] > max) {
            max = values[i];
            indexes = [i];
        } else if (values[i] === max) {
            indexes.push(i);
        }
    }

    return indexes;
}

export const GameResult: React.FC<GameResultProps> = (props: GameResultProps) => {
    const theme = useTheme();
    const maxScoreElements = maxScoreIndexes(props.game.finalScores);

    const cellStyle: SxProps<Theme> = {
        backgroundColor: "#fff",
        padding: theme.spacing(1),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const commonTextStyle: SxProps<Theme> = {
        width: "fit-content",
        // paddingLeft: "1rem",
        // paddingRight: "1rem",
        textAlign: "center",
    };

    const playerTextStyle: SxProps<Theme> = {...commonTextStyle, minWidth: "225px"};

    const scoreTextStyle: SxProps<Theme> = {...commonTextStyle, minWidth: "2rem", fontSize: "1.25rem", fontWeight: 600};
    const maxScoreCellStyle: SxProps<Theme> = {...cellStyle, backgroundColor: "#daf0da"};

    return (
        <Box
            sx={{
                flexGrow: 1,
                pb: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Grid
                container
                sx={{
                    display: "grid",
                    gridTemplateColumns: "max-content max-content",
                    gap: "1px",
                    alignItems: "stretch",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                }}
            >
                {props.game.teams.map((team, index) => (
                    <React.Fragment key={`result_${index}`}>
                        <Grid key="roster" sx={maxScoreElements.includes(index) ? maxScoreCellStyle : cellStyle}>
                            <Stack direction={"column"} alignItems="center">
                                {team.map((player) => (
                                    <Typography key={`pl_${player.id}`} sx={playerTextStyle}>
                                        {player.name}
                                    </Typography>
                                ))}
                            </Stack>
                        </Grid>
                        <Grid key="score" sx={maxScoreElements.includes(index) ? maxScoreCellStyle : cellStyle}>
                            <Typography sx={scoreTextStyle}>{props.game.finalScores[index]}</Typography>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
};

export default GameResult;
