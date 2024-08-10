import React from "react";
import {Box, LinearProgress, Skeleton, Stack, useMediaQuery} from "@mui/material";
import {grey} from "@mui/material/colors";
import {iota} from "../../utility/common";
import {useTheme} from "@mui/material/styles";

const skeletonColor = grey[800];

const ScoreSkeleton = () => ElementSkeleton("100%");
const EndSkeleton = () => ElementSkeleton("40%");

const ElementSkeleton = (width: string) => (
    <Skeleton
        variant="rectangular"
        width={width}
        height="7vh"
        sx={{backgroundColor: skeletonColor, maxHeight: "7vh"}}
    />
);

const LoadingGameStub: React.FC = () => {
    const theme = useTheme();
    const spacing = useMediaQuery(theme.breakpoints.down("sm")) ? 0.5 : 1;

    return (
        <Stack spacing={spacing} height="100%">
            <LinearProgress />
            <Box sx={{paddingLeft: {xs: "0.5rem", sm: "0"}, paddingRight: {xs: "0.5rem", sm: "0"}, height: "100%"}}>
                <Stack spacing={spacing}>
                    <Skeleton variant="rounded" width="100%" height="20vh" sx={{backgroundColor: grey[800]}} />
                    <Stack spacing={spacing} height="100%">
                        {iota(8).map((value) => (
                            <Stack
                                key={`score_row_${value}`}
                                direction="row"
                                spacing={spacing}
                                width={"100%"}
                                height={"100%"}
                            >
                                <ScoreSkeleton />
                                <ScoreSkeleton />
                                <EndSkeleton />
                                <ScoreSkeleton />
                                <ScoreSkeleton />
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
};

export default LoadingGameStub;
