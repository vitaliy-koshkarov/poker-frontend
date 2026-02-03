import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
	let navigateTo = useNavigate();

  	const redirectToRegisterPage = () => { 
    	navigateTo("/register");
    }

    const redirectToLoginPage = () => { 
    	navigateTo("/login");
    }

	return(
		<div style={{ padding: "20px" }}>
			Welcome to Poker
			<br/>
			<br/>

			<button onClick={redirectToLoginPage}>Login</button>
			<br/>
			<br/>
			<button onClick={redirectToRegisterPage}>Register</button>
		</div>
	);
}