import { authFetch } from "../authFetch";

const BASE_URL = "http://localhost:8080/api/tables";

export async function fetchTables() {
    const tablesResponse = await authFetch(`${BASE_URL}`);

    if (!tablesResponse.ok) {
        throw new Error("Failed to fetch tables");
    }

    return tablesResponse.json();
}

export async function createGame(maxPlayers: int, buyIn: int, name: string) {
	const createTableResponse = await authFetch(`${BASE_URL}/create`, {
		method: "POST",
		body: JSON.stringify({maxPlayers, buyIn, name})
	});

	if (!createTableResponse.ok) {
        throw new Error("Failed to create game");
    }

	window.location.replace("/lobby");
}

export async function deleteTable(id: bigint) {
	const deleteResponse = await authFetch(`${BASE_URL}/delete/${id}`, {
		method: "DELETE"
	})

	if (!deleteResponse.ok) {
        throw new Error("Failed to remove table with id " + id);
    }

    window.location.replace("/lobby");
}