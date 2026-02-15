import {useNavigate} from "react-router-dom";
import mainCss from "../Main.module.css";
import welcomeCss from "./Welcome.module.css";

export default function WelcomePage() {
    let navigateTo = useNavigate();

    const redirectToRegistrationPage = () => {
        navigateTo("/registration");
    }

    const redirectToLoginPage = () => {
        navigateTo("/login");
    }

    return (
        <div className={mainCss.page}>
            <div className={welcomeCss.title}>Welcome to Poker</div>

            <div className={welcomeCss.loginBtn}>
                <button onClick={redirectToLoginPage}>Login</button>
            </div>

            <div className={welcomeCss.registrationBtn}>
                <button onClick={redirectToRegistrationPage}>Registration</button>
            </div>
        </div>
    );
}