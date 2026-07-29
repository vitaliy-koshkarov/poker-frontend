import {authFetch} from "./authFetch";
import {clearToken} from "../auth/token";

const API_URL = "http://localhost:8080/api/auth";

export async function register(email: string, nickname: string, password: string): Promise<string> {

    const registerResponse = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, nickname, password})
    });

    if (!registerResponse.ok) {
        throw new Error(await registerResponse.text());
    }

    const registerData = await registerResponse.json();

    return registerData.token;
}

export async function login(email: string, password: string): Promise<string> {
    const loginResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });

    if (!loginResponse.ok) {
        throw new Error("Login failed");
    }

    const loginData = await loginResponse.json();

    return loginData.token;
}

export async function logout() {
    const logoutResponse = await authFetch(`${API_URL}/logout`, {
        method: "POST"
    });

    if (!logoutResponse.ok) {
        throw new Error("Logout error");
    }

    clearToken();

    window.location.replace("/");
}

export async function getCurrentPlayerId() {
    const meResponse = await authFetch(`${API_URL}/getCurrentPlayerId`, {
        method: "GET"
    });

    if (!meResponse.ok) {
        throw new Error("Logout error");
    }

    const data = await meResponse.json();

    return data.currentPlayerId;
}