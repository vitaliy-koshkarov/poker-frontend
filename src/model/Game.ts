import type {Player} from "./Player.ts";

export interface Game {
    id: bigint;
    currentPlayers: number;
    maxPlayers: number;
    buyIn: number;
    status: number,
    name: string;
    players: Player[];
}