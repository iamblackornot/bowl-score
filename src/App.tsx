import {useEffect} from "react";

import "./App.css";

import MainContainer from "./components/main/MainContainer";
import LiveGamePageContent from "./components/game/LiveGamePageContent";

function App() {
    useEffect(() => {
        console.log("App mounted");
        return () => console.log("App unmounted");
    });

    return (
        <MainContainer>
            <LiveGamePageContent />
        </MainContainer>
    );
}

export default App;
