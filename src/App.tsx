import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/welcome/WelcomePage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import LoginPage from "./pages/login/LoginPage";
import LobbyPage from "./pages/lobby/LobbyPage";
import ProfilePage from "./pages/profile/ProfilePage";
import CreateGamePage from "./pages/table/CreateGamePage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage/>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/lobby" element={<LobbyPage/>}/>
            <Route path="/createGame" element={<CreateGamePage/>}/>
        </Routes>
    );
}
