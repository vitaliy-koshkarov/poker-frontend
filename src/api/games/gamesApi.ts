import {authFetch} from "../authFetch";
import type {GameTable} from "../../model/GameTable";

const BASE_URL = "http://localhost:8080/api/games";

export async function fetchGames() {
    const gamesResponse = await authFetch(`${BASE_URL}`);

    if (!gamesResponse.ok) {
        throw new Error("Failed to fetch games");
    }

    return gamesResponse.json();
}

export async function createGame(maxPlayers: number, buyIn: number, name: string) {
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
    // TODO: find better way for redirection
    window.location.replace(`/game/${gameTable.id}`);
}
