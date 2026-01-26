import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
	let navigate = useNavigate(); 
  	
  	const redirectToRegisterPage = () => { 
    	navigate("/register");
    }

    const redirectToLoginPage = () => { 
    	navigate("/login");
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