import { authFetch } from "./authFetch";

const BASE_URL = "http://localhost:8080/api";

export async function fetchTables() {
    const response = await authFetch(`${BASE_URL}/tables`);

    if (!response.ok) {
        throw new Error("Failed to fetch tables");
    }

    return response.json();
}
