import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {saveToken} from "../../auth/token.ts";
import {login} from "../../api/authApi.ts";
import mainCss from "../../assets/css/Main.module.css";
import loginCss from "../../assets/css/login/Login.module.css";
import {handleErrorMessage} from "../../api/handleErrorMessage.ts";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {errorMessage, showErrorMessage, clearErrorMessage} = handleErrorMessage();

    const navigateTo = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        clearErrorMessage();

        try {
            const token = await login(email, password);
            saveToken(token);
            console.log("Successful login");
            navigateTo("/profile");
        } catch (error) {
            showErrorMessage(error);
        }
    }

    return (
        <div className={mainCss.page}>

            <div className={mainCss.title}>Login</div>
            {errorMessage && <p className={mainCss.errorMessage}>{errorMessage}</p>}

            <div className={loginCss.inputEmail}>
                <input placeholder="Email" value={email}
                       onChange={e => setEmail(e.target.value)}/>
            </div>

            <div className={loginCss.inputPassword}>
                <input type="password" placeholder="Password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
            </div>

            <div className={loginCss.loginBtn}>
                <button type="submit" onClick={handleLogin}>Login</button>
            </div>

            <div className={loginCss.link}>
                <Link to={`/`}>To Welcome page</Link>
            </div>
        </div>
    );
}