import React, {useEffect} from "react";
import {Box, Divider, List, ListItem, ListSubheader} from "@mui/material";
import useGameHistory from "../../hooks/GameHistory";
import {IGameSummary} from "../../models/IGame";
import GameHistoryRow from "./GameHistoryRow";
import CompactPagination from "./Pagination";
import ErrorNotification from "../ErrorNotification";
import LoadingGameHistoryStub from "./LoadingGameHistoryStub";

const calcPageSize = (screenHeight: number): number => {
    const header = 50;
    const paginator = 70;
    const row = 75;
    const spacePercentage = 0.7;

    const count = Math.floor((screenHeight * spacePercentage - header - paginator) / row);
    return Math.max(5, count);
};

const calcPageCount = (pageSize: number, gamesCount: number) => {
    return Math.floor(gamesCount / pageSize) + 1;
};

const GameHistoryPageContent: React.FC = () => {
    const history = useGameHistory();
    const pageSize = calcPageSize(window.screen.height);

    const [page, setPage] = React.useState(1);

    const onPageChange = async (value: number) => {
        const res = await history.load(value, pageSize);
        if (res) setPage(value);
    };

    useEffect(() => {
        if (!history.loading) {
            setPage(1);
            history.load(1, pageSize);
        }
    }, []);

    return (
        <>
            <ErrorNotification
                opened={history.error.active}
                message={history.error.errorMessage}
                onClose={() => history.error.toggleActive(false)}
            />
            {history.loading && <LoadingGameHistoryStub recordCount={pageSize} />}
            {!history.loading && (
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    width={"100%"}
                    maxWidth={"100vw"}
                    minHeight={"100%"}
                    color="rgba(0, 0, 0, 0.6)"
                    bgcolor="background.paper"
                >
                    <List
                        sx={{
                            width: "100%",
                            pb: 0,
                        }}
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                {`Game history (${(page - 1) * pageSize + 1} -
                                  ${Math.min(page * pageSize, history.data?.totalGames ?? 0)} 
                                  of ${history.data?.totalGames})`}
                            </ListSubheader>
                        }
                    >
                        {history.data?.games?.map((game: IGameSummary) => (
                            <React.Fragment key={game.id}>
                                <Divider />
                                <GameHistoryRow game={game} />
                            </React.Fragment>
                        ))}
                        <Divider />
                        <ListItem>
                            <CompactPagination
                                page={page}
                                pageCount={calcPageCount(pageSize, history.data?.totalGames ?? 1)}
                                onPageChange={onPageChange}
                            />
                        </ListItem>
                    </List>
                </Box>
            )}
        </>
    );
};

export default GameHistoryPageContent;
