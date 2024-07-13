import React from "react";
import {Grid, Typography, Box, useTheme, useMediaQuery} from "@mui/material";

const ResponsiveGrid = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery("(max-width:420px)");

    return (
        <Grid container direction="column">
            {[1, 2, 3].map((item) => (
                <Grid item key={item}>
                    <Box
                        sx={{
                            transform: isSmallScreen ? "rotate(90deg)" : "none",
                            width: isSmallScreen ? "100px" : "auto", // Adjust width for rotation
                            height: isSmallScreen ? "100px" : "auto", // Adjust height for rotation
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "10px 0", // Add margin between items
                            transition: "transform 0.3s ease-in-out",
                        }}
                    >
                        <Typography variant="h6">Item {item}</Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default ResponsiveGrid;
