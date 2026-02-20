import {getToken} from "../auth/token";

export async function authFetch(url: string, options: RequestInit = {}) : Promise<Response> {
    const token = getToken();

    return fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
}