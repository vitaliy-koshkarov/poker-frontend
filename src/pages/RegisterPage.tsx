import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/authApi";
import { saveToken } from "../auth/token";

export default function RegisterPage() {
	const [email, setEmail] = useState("");
	const [nickname, setNickname] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const redirectToLobby = useNavigate();

  	async function handleRegister(e: React.FormEvent) {
    	e.preventDefault();

	    try {
	      	const token = await register(email, nickname, password);
	      	saveToken(token);
	      	redirectToLobby("/lobby");
	    } catch {
	      	setError("Registration failed");
	    }
	}

	return (
    	<form onSubmit={handleRegister}>
      		<h2>Register</h2>

      		{error && <p style={{ color: "red" }}>{error}</p>}

      		<input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
      		<br/>
      		<br/>
      		<input placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)}/>
      		<br/>
      		<br/>
      		<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      		<br/>
      		<br/>
      		<button type="submit">Register</button>
      		<br/>
      		<br/>
      		<Link to={`/`}>To Welcome Page</Link>
    	</form>
    );
}