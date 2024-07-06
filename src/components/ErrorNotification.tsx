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
    };

    return (
        <Snackbar
            open={props.opened}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            TransitionComponent={SlideTransition}
            message={props.message}
            onClose={props.onClose}
            autoHideDuration={5000}
        >
            <SnackbarContent sx={style} message={props.message} />
        </Snackbar>
    );
};

export default ErrorNotification;
