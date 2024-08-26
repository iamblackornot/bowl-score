import {useRouteError} from "react-router-dom";
import {Stack, Typography} from "@mui/material";

export default function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return (
        <Stack id="error-page" spacing={2} justifyContent="center" sx={{height: "100vh"}}>
            <Typography variant="h2">Oops!</Typography>
            <Typography variant="body1">Sorry, an unexpected error has occurred.</Typography>
            <Typography variant="body1">
                <i>{error.statusText || error.message}</i>
            </Typography>
        </Stack>
    );
}
