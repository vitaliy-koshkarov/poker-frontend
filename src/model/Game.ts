export class Game {
    id: bigint;
    currentPlayers: number;
    maxPlayers: number;
    buyIn: number;
    status: number;
    name: string;

    constructor(id: bigint, currentPlayers: number, maxPlayers: number, buyIn: number, status: number, name: string) {
        this.id = id;
        this.currentPlayers = currentPlayers;
        this.maxPlayers = maxPlayers;
        this.buyIn = buyIn;
        this.status = status;
        this.name = name;
    }
}