export interface GameTable {
    id: bigint;
    currentPlayers: number;
    maxPlayers: number;
    buyIn: number;
    name: string;
}