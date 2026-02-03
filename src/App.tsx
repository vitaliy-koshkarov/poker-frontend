import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LobbyPage from "./pages/LobbyPage";
import ProfilePage from "./pages/ProfilePage";
import CreateGamePage from "./pages/table/CreateGamePage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/lobby" element={<LobbyPage/>}/>
            <Route path="/createGame" element={<CreateGamePage/>}/>
        </Routes>
    );
}
