import {useNavigate} from "react-router-dom";
import mainCss from "../../assets/css/Main.module.css";
import welcomeCss from "../../assets/css/welcome/Welcome.module.css";

export default function WelcomePage() {
    const navigateTo = useNavigate();

    const navigateToRegistrationPage = () => {
        navigateTo("/registration");
    }

    const navigateToLoginPage = () => {
        navigateTo("/login");
    }

    return (
        <div className={mainCss.page}>
            <div className={welcomeCss.title}>Welcome to Poker</div>

            <div className={welcomeCss.loginBtn}>
                <button onClick={navigateToLoginPage}>Login</button>
            </div>

            <div className={welcomeCss.registrationBtn}>
                <button onClick={navigateToRegistrationPage}>Registration</button>
            </div>
        </div>
    );
}