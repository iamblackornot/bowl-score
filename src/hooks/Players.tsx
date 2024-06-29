import React from "react";
import IPlayer from "../models/IPlayer";

import {useData} from "./Data";
import dataServer from "../database/server";

export default function usePlayers() {
    const {data, setData, request, loading, error} = useData<IPlayer[]>();

    async function loadPlayers() {
        const data = await request(async () => await dataServer.getPlayers());
        setData(data ? data : []);
    }

    async function addPlayer(name: string): Promise<IPlayer | null> {
        const newPlayer = await request(async () => await dataServer.addPlayer(name));

        if (newPlayer) {
            const newData = data ? data : [];
            newData.push(newPlayer);
            newData.sort((lhs: IPlayer, rhs: IPlayer) => (lhs.name.toLowerCase() < rhs.name.toLowerCase() ? -1 : 1));
            setData(newData);
        }

        return newPlayer;
    }

    React.useEffect(() => {
        loadPlayers();
    }, []);

    return {players: data, loading, error, addPlayer};
}

// export function usePlayers() {
//     const [players, setPlayers] = React.useState<IPlayer[]>([]);
//     const [loading, setLoading] = React.useState(false);

//     const error = useError();

//     async function loadPlayers() {
//         try {
//             setLoading(true);
//             const res = await axios.get<IPlayer[]>("http://localhost:3111/players");
//             //console.log(res);

//             setPlayers(res.data);
//             setLoading(false);
//         } catch (err) {
//             let errMessage = "network error";

//             if (axios.isAxiosError(err)) {
//                 const axiosError = err as AxiosError;
//                 errMessage = `${axiosError.message}`;
//             }

//             setPlayers([]);
//             error.toggleActive(true);
//             error.setErrorMessage(`Failed to load players: ${errMessage}`);
//         } finally {
//             setLoading(false);
//         }
//     }

//     React.useEffect(() => {
//         loadPlayers();
//     }, []);

//     return {players, loading, loadPlayers, error};
// }
