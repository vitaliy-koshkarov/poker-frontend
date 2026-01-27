import { authFetch } from "./authFetch";

const BASE_URL = "http://localhost:8080/api";

export async function fetchTables() {
    const tablesResponse = await authFetch(`${BASE_URL}/tables`);

    if (!tablesResponse.ok) {
        throw new Error("Failed to fetch tables");
    }

    return tablesResponse.json();
}
