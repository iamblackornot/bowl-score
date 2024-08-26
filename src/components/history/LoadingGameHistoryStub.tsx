import React from "react";
import {Box, LinearProgress, Skeleton, Stack, useMediaQuery} from "@mui/material";
import {grey} from "@mui/material/colors";
import {iota} from "../../utility/common";
import {useTheme} from "@mui/material/styles";

const skeletonColor = grey[800];

interface ElementSkeletonProps {
    width: string;
    height: string;
}

const ElementSkeleton: React.FC<ElementSkeletonProps> = ({width, height}: ElementSkeletonProps) => (
    <Skeleton
        variant="rounded"
        width={width}
        height={height}
        sx={{backgroundColor: skeletonColor, maxHeight: {height}}}
    />
);

const GameRecordSkeleton: React.FC = () => {
    const theme = useTheme();
    const spacing = useMediaQuery(theme.breakpoints.down("sm")) ? 0.5 : 1;
    return (
        <>
            <ElementSkeleton width="100%" height="1px" />
            <Box height="75px" display="flex" justifyContent="center" alignItems="center">
                <Stack
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    spacing={spacing}
                    width={"100%"}
                    height={"100%"}
                >
                    <ElementSkeleton width="50%" height="40%" />
                    <ElementSkeleton width="50%" height="20%" />
                </Stack>
            </Box>
        </>
    );
};

export interface LoadingGameHistoryStubProps {
    recordCount: number;
}

const LoadingGameHistoryStub: React.FC<LoadingGameHistoryStubProps> = (props: LoadingGameHistoryStubProps) => {
    const theme = useTheme();
    const spacing = useMediaQuery(theme.breakpoints.down("sm")) ? 0.5 : 1;

    return (
        <Stack spacing={spacing} height="100%">
            <LinearProgress />
            <Box sx={{paddingLeft: "0.5rem", paddingRight: "0.5rem", height: "100%"}}>
                <Stack spacing={spacing} height="100%">
                    <Box height="50px" display="flex" justifyContent="center" alignItems="center">
                        <Skeleton variant="rounded" width="50%" height="40%" sx={{backgroundColor: grey[800]}} />
                    </Box>
                    <Stack spacing={spacing}>
                        {iota(props.recordCount).map((value) => (
                            <GameRecordSkeleton key={`record_${value}`} />
                        ))}
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
};

export default LoadingGameHistoryStub;
