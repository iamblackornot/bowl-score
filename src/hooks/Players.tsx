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

    return {data, loading, error, addPlayer, loadPlayers};
}
