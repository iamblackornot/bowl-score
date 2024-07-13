import * as React from "react";
import {Box, Grid, Stack, useMediaQuery} from "@mui/material";
import {EndItem, PlayerItem, ScoreItem, TeamHeader} from "./GridItem";
import {useTheme} from "@mui/material/styles";

export type EndColumnProps = {
    // types...
};

const EndColumn: React.FC<EndColumnProps> = () => {
    const isSmallScreen = useMediaQuery("(max-width:420px)");
    const theme = useTheme();

    return (
        <React.Fragment>
            <Stack>
                <Stack sx={{backgroundColor: "#dddddd", opacity: "0"}}>
                    <TeamHeader text="22" />
                    <Stack direction={isSmallScreen ? "row" : "column"} spacing={0.25}>
                        <PlayerItem text="1" />
                        <PlayerItem text="1" />
                        <PlayerItem text="1" />
                    </Stack>
                </Stack>
                <Stack
                    spacing={0.25}
                    sx={{
                        height: "100%",
                        // paddingRight: `${theme.spacing(0.25)}`,
                        // paddingLeft: `${theme.spacing(0.25)}`,
                        backgroundColor: "#fff",
                    }}
                >
                    <EndItem text="10" />
                    <EndItem text="20" />
                </Stack>
            </Stack>
        </React.Fragment>
    );
};

export default EndColumn;
