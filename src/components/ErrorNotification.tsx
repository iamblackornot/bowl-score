import {Slide, SlideProps, Snackbar, SnackbarContent} from "@mui/material";
import React from "react";

export type ErrorNotificationProps = {
    opened: boolean;
    message: string;
    onClose: () => void;
};

const ErrorNotification: React.FC<ErrorNotificationProps> = (props: ErrorNotificationProps) => {
    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="down" />;
    }

    const style = {
        backgroundColor: "crimson",
        fontWeight: "bold",
        textAlign: "center",
        width: "fit-content",
    };

    return (
        <Snackbar
            open={props.opened}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            TransitionComponent={SlideTransition}
            message={props.message}
            onClose={props.onClose}
            autoHideDuration={3000}
            sx={{
                maxWidth: "80%",
                width: "fit-content",
                margin: "auto",
                "& .MuiSnackbarContent-root": {
                    minWidth: "100px !important",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            }}
        >
            <SnackbarContent sx={style} message={props.message} />
        </Snackbar>
    );
};

export default ErrorNotification;
