import {Grid, Box, Typography} from "@mui/material";

const FloatingBottomRowGrid = () => {
    return (
        <Box sx={{height: "100vh", overflowY: "auto"}}>
            <Grid container spacing={2}>
                {/* Add as many Grid items as you need */}
                {Array.from(Array(20)).map((_, index) => (
                    <Grid item xs={12} key={index}>
                        <Box sx={{height: 100, backgroundColor: "#f0f0f0", border: "1px solid #ccc"}}>
                            <Typography variant="body1">Item {index + 1}</Typography>
                        </Box>
                    </Grid>
                ))}
                {/* Last row with sticky position */}
                <Grid
                    item
                    xs={12}
                    sx={{
                        position: "sticky",
                        bottom: 0,
                        backgroundColor: "#fff",
                        zIndex: 1,
                        borderTop: "1px solid #ccc",
                    }}
                >
                    <Box sx={{height: 100, backgroundColor: "#f0f0f0"}}>
                        <Typography variant="body1">Last Row</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FloatingBottomRowGrid;
