export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("jwt_token");

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        }
    });
}