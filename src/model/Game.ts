export interface Game {
    id: bigint;
    currentPlayers: number;
    maxPlayers: number;
    buyIn: number;
    status: number,
    name: string;
}