import { authFetch } from "../authFetch";
import type { GameTable } from "../../model/GameTable";

const BASE_URL = "http://localhost:8080/api/games";
const GAME_TABLE_URL = "http://localhost:8080/api/game";

export async function fetchGames() {
    const gamesResponse = await authFetch(`${BASE_URL}`);

    if (!gamesResponse.ok) {
        throw new Error("Failed to fetch games");
    }

    return gamesResponse.json();
}

export async function createGame(maxPlayers: int, buyIn: int, name: string) {
	const createGameResponse = await authFetch(`${BASE_URL}/create`, {
		method: "POST",
		body: JSON.stringify({maxPlayers, buyIn, name})
	});

	if (!createGameResponse.ok) {
        throw new Error("Failed to create game");
    }

	window.location.replace("/lobby");
}

export async function deleteGame(id: bigint) {
	const deleteGameResponse = await authFetch(`${BASE_URL}/delete/${id}`, {
		method: "DELETE"
	})

	if (!deleteGameResponse.ok) {
        throw new Error("Failed to remove game with id " + id);
    }

    window.location.replace("/lobby");
}

export async function joinGame(gameTable: GameTable) {
    console.log("Game table id: " + JSON.stringify(gameTable));

    window.location.replace(`/game/${gameTable.id}`);
}

export async function fetchGamesById(id: bigint) {
    console.log("fetchGamesById: " + id);
    const gameTableResponse = await authFetch(`${GAME_TABLE_URL}/${id}`, {
        method: "GET"
    });

    if (!gameTableResponse.ok) {
        throw new Error("Failed to fetch game with id " + id);
    }

    return gameTableResponse.json();
}
