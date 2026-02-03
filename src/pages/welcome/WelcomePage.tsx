import { useNavigate } from "react-router-dom";
import LoginPage from "../login/LoginPage";
import mainCss from "../Main.module.css";

export default function WelcomePage() {
	let navigateTo = useNavigate();

  	const redirectToRegistrationPage = () => {
    	navigateTo("/registration");
    }

    const redirectToLoginPage = () => { 
    	navigateTo("/login");
    }

	return(
		<div className={mainCss.page}>
			Welcome to Poker
			<br/>
			<br/>

			<button onClick={redirectToLoginPage}>Login</button>
			<br/>
			<br/>
			<button onClick={redirectToRegistrationPage}>Registration</button>
		</div>
	);
}