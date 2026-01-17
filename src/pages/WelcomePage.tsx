import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
	let navigate = useNavigate(); 
  	
  	const redirectToRegister = () => { 
    	navigate("/register");
    }

	return(
		<div style={{ padding: "20px" }}>
			Welcome to Poker
			<br/>

			<button onClick={redirectToRegister}>Register</button>
		</div>
	);
}