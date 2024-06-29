import React from "react";
import useError from "./Error";
import Result from "../database/result";

export function useData<T>() {
    const [data, setData] = React.useState<T | null>();
    const [loading, setLoading] = React.useState(false);

    const error = useError();

    const request = async <T,>(func: () => Promise<Result<T>>): Promise<T | null> => {
        setLoading(true);

        const res = await func();

        if (!res.success) {
            error.toggleActive(true);
            error.setErrorMessage(res.errorMessage);
        } else {
            error.toggleActive(false);
            error.setErrorMessage("");
        }

        setLoading(false);
        return res.data;
    };

    return {data, setData, request, loading, error};
}
