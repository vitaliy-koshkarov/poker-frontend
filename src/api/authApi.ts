import { authFetch } from "./authFetch";
import { getToken, clearToken } from "../auth/token";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/auth";

export async function register(email: string, nickname: string, password: string): Promise<string> {

	const response = await fetch(`${API_URL}/register`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({email, nickname, password})
	});

	if (!response.ok) {
		throw new Error("Registration failed");
	}

	const data = await response.json();

	return data.token;
}

export async function login(email: string, password: string): Promise<string> {
	const response = await fetch(`${API_URL}/login`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({email, password})
	});

	if (!response.ok) {
		throw new Error("Login failed");
	}

	const data = await response.json();

	return data.token;
}

export async function logout() {
	// const token = getToken();
	// console.log("JWT: " + token);

	const response = await authFetch(`${API_URL}/logout`, {
		method: "POST"
	});

	if (!response.ok) {
		throw new Error("Logout error");
	}

	clearToken();

	window.location.replace("/");
}