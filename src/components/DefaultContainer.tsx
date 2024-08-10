import {Box, SxProps, Theme, useTheme} from "@mui/material";
import React, {PropsWithChildren} from "react";
import useMedia from "../hooks/Media";
import {mergeObjects} from "../utility/common";

export type DefaultContainerProps = {
    sx?: SxProps<Theme>;
};

const DefaultContainer: React.FC<PropsWithChildren<DefaultContainerProps>> = (
    props: PropsWithChildren<DefaultContainerProps>
) => {
    const theme = useTheme();
    const isSmallScreen = useMedia().isSmallScreen;

    return (
        <Box
            sx={mergeObjects(
                {
                    padding: theme.spacing(isSmallScreen ? 0.5 : 1),
                    display: "flex",
                    justifyContent: "center",
                    color: "rgba(0, 0, 0, 0.65)",
                    backgroundColor: "#fff",
                },
                props.sx
            )}
        >
            {props.children}
        </Box>
    );
};

export default DefaultContainer;
