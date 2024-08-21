import {createContext, PropsWithChildren, useEffect, useState} from "react";
import useError from "./Error";
import dataServer from "../database/server";
import Result from "../database/result";
import {IToken} from "../models/IToken";

export type AuthProviderType = typeof useAuth;

const unauthorizedUsername = "Guest";

const useAuth = () => {
    const [isAuthed, setAuthed] = useState(false);
    const [username, setUsername] = useState(unauthorizedUsername);
    const [loading, setLoading] = useState(false);

    const error = useError();

    const refreshToken = async () => {
        return authAction(async () => await dataServer.refreshToken());
    };

    const login = async (username: string, password: string): Promise<boolean> => {
        return authAction(async () => await dataServer.login(username, password));
    };

    const logout = async (): Promise<void> => {
        setLoading(true);
        error.toggleActive(false);

        const res = await dataServer.logout();
        if (res.success) {
            setAuthed(false);
            setUsername(unauthorizedUsername);
        }

        setLoading(false);
    };

    const authAction = async (action: () => Promise<Result<IToken>>): Promise<boolean> => {
        setLoading(true);
        error.toggleActive(false);

        let ret = false;
        const res = await action();

        if (!res.success) {
            if (res.errorMessage) {
                error.setErrorMessage(res.errorMessage);
                error.toggleActive(true);
            }
        } else {
            if (res.data) {
                localStorage.setItem("accessToken", res.data.access);
                setUsername(res.data.username);
                setAuthed(true);
                ret = true;
            }
        }

        setLoading(false);
        return ret;
    };

    useEffect(() => {
        refreshToken();
    }, []);

    return {isAuthed, username, loading, error, login, logout};
};

type AuthContextType = ReturnType<typeof useAuth>;

const defaultAuthContext: AuthContextType = {
    isAuthed: false,
    username: unauthorizedUsername,
    loading: false,
    error: {
        active: false,
        toggleActive: () => {},
        errorMessage: "",
        setErrorMessage: () => {},
    },
    login: (_username: string, _password: string): Promise<boolean> => Promise.resolve(false),
    logout: (): Promise<void> => Promise.resolve(),
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
