import { useState } from "react";
import { saveToken } from "../auth/token.ts";
import { login } from "../api/authApi.ts";

type Props = {
	onLoginSuccess: () => void;
};

export default function LoginPage({ onLoginSuccess }: Props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function hanleLogin() {
		try {
			setLoading(true);
			setError(null);

			const token = await login(email, password);
			saveToken(token);

			onLoginSuccess();
		} catch(e) {
			setError("Invalid email or password");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div style={{ padding: "20px" }}>
      		<h2>Login</h2>

      		<input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

      		<br/>

			<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>

      		<br/>

      		<button onClick={handleLogin} disabled={loading}>{loading ? "Logging in..." : "Login"}</button>

			{error && <p style={{ color: "red" }}>{error}</p>}
    	</div>
	);

	// return <h2>Please log in</h2>;
}