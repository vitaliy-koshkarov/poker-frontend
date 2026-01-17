import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi";

export default function RegisterPage() {
	const [email, setEmail] = useState("");
	const [nickname, setNickname] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

  	async function handleRegister(e: React.FormEvent) {
    	e.preventDefault();

	    try {
	      	const token = await register(email, nickname, password);
	      	localStorage.setItem("jwt_token", token);
	      	navigate("/lobby");
	    } catch {
	      	setError("Registration failed");
	    }
	}

	return (
    	<form onSubmit={handleRegister}>
      		<h2>Register</h2>

      		{error && <p style={{ color: "red" }}>{error}</p>}

      		<input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

      		<input placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)}/>

      		<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>

      		<button type="submit">Register</button>
    	</form>
    );
    // return <h2>Register</h2>;
}