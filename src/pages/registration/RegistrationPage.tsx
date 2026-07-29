import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {register} from "../../api/authApi";
import {saveToken} from "../../auth/token";
import mainCss from "../../assets/css/Main.module.css";
import registrationCss from "../../assets/css/registration/Registration.module.css"
import {handleErrorMessage} from "../../api/handleErrorMessage.ts";

export default function RegistrationPage() {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const {errorMessage, showErrorMessage, clearErrorMessage} = handleErrorMessage();

    const navigateTo = useNavigate();

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        clearErrorMessage();

        try {
            const token = await register(email, nickname, password);
            saveToken(token);
            navigateTo("/profile");
        } catch (error) {
            showErrorMessage(error);
        }
    }

    return (
        <div className={mainCss.page}>
            <form onSubmit={handleRegister}>
                <div className={mainCss.title}>Registration</div>
                {errorMessage && <p className={mainCss.errorMessage}>{errorMessage}</p>}

                <div className={registrationCss.inputEmail}>
                    <input placeholder="Email" value={email}
                           onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className={registrationCss.inputNickname}>
                    <input placeholder="Nickname" value={nickname}
                           onChange={e => setNickname(e.target.value)}/>
                </div>

                <div className={registrationCss.inputPassword}>
                    <input type="password" placeholder="Password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className={registrationCss.registerBtn}>
                    <button type="submit">Register</button>
                </div>

                <div className={registrationCss.link}>
                    <Link to={`/`}>To Welcome Page</Link>
                </div>
            </form>
        </div>
    );
}