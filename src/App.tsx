import "./App.css";

import MainContainer from "./components/main/MainContainer";
import LiveGamePageContent from "./components/game/LiveGamePageContent";
import AuthProvider from "./hooks/Auth";

function App() {
    return (
        <AuthProvider>
            <MainContainer>
                <LiveGamePageContent />
            </MainContainer>
        </AuthProvider>
    );
}

export default App;
