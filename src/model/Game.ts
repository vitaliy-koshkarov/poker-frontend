import type {Player} from "./Player.ts";

export class Game {
    id: number;
    name: string;
    creatorPlayerId: number;
    currentPlayers: number;
    maxPlayers: number;
    buyIn: number;
    status: number;
    dealerId: number;
    activePlayerId: number;
    smallBlind: number;
    bigBlind: number;
    minRaise: number;
    players: Player[];

    constructor(id: number, name: string, creatorPlayerId: number, currentPlayers: number, maxPlayers: number,
                buyIn: number, status: number, dealerId: number, activePlayerId: number,
                smallBlind: number, bigBlind: number, minRaise: number, players: Player[]) {
        this.id = id;
        this.name = name;
        this.creatorPlayerId = creatorPlayerId;
        this.currentPlayers = currentPlayers;
        this.maxPlayers = maxPlayers;
        this.buyIn = buyIn;
        this.status = status;
        this.dealerId = dealerId;
        this.activePlayerId = activePlayerId;
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
        this.minRaise = minRaise;
        this.players = players;
    }
}