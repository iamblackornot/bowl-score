import {createBrowserRouter} from "react-router-dom";

import ErrorPage from "./components/pages/ErrorPage";
import LiveGamePage from "./components/pages/LiveGamePage";
import GameHistoryPage from "./components/pages/GameHistoryPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LiveGamePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/results",
        element: <GameHistoryPage />,
        errorElement: <ErrorPage />,
    },
]);

export default router;
