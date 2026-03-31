export class Game {
    id: bigint;
    currentPlayers: number;
    maxPlayers: number;
    buyIn: number;
    status: number;
    name: string;
    creatorPlayerId: bigint;
    dealerId: number;
    activePlayerId: bigint;

    constructor(id: bigint, currentPlayers: number, maxPlayers: number, buyIn: number, status: number, name: string,
                creatorPlayerId: bigint, dealerId: number, activePlayerId: bigint) {
        this.id = id;
        this.currentPlayers = currentPlayers;
        this.maxPlayers = maxPlayers;
        this.buyIn = buyIn;
        this.status = status;
        this.name = name;
        this.creatorPlayerId = creatorPlayerId;
        this.dealerId = dealerId;
        this.activePlayerId = activePlayerId;
    }
}