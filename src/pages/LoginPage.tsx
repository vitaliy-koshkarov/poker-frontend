import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveToken } from "../auth/token.ts";
import { login } from "../api/authApi.ts";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const redirectToLobby = useNavigate();

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();

		try {
			const token = await login(email, password);
			saveToken(token);
			console.log("Successful login");
			redirectToLobby("/lobby");
		} catch(e) {
			setError("Invalid email or password");
		}
	}

	return (
		<div style={{padding: "20px"}}>
			<h2>Login</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
			<br/>
			<br/>
			<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
			<br/>
			<br/>
			<button type="submit" onClick={handleLogin}>Login</button>
			<br/>
			<br/>
			<Link to={`/`}>To Welcome page</Link>
		</div>
	);
}