export class Game {
    id: number;
    currentPlayers: number;
    maxPlayers: number;
    buyIn: number;
    status: number;
    name: string;
    creatorPlayerId: number;
    dealerId: number;
    activePlayerId: number;

    constructor(id: number, currentPlayers: number, maxPlayers: number, buyIn: number, status: number, name: string,
                creatorPlayerId: number, dealerId: number, activePlayerId: number) {
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