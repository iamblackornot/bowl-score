import dataServer from "../database/server";
import {GameSummaryPayload} from "../models/IGame";
import {useData} from "./Data";

const useGameHistory = () => {
    const {data, setData, request, loading, error} = useData<GameSummaryPayload>();

    const loadGameHistory = async (page: number, pageSize: number): Promise<boolean> => {
        const res = await request(() => dataServer.getGameHistory(page, pageSize));

        if (res) {
            for (const game of res.games) {
                game.created = new Date(game.created);
                game.ended = new Date(game.ended);
            }
        }

        setData(res);

        return res != null;
    };

    return {data, load: loadGameHistory, loading, error};
};

export default useGameHistory;
