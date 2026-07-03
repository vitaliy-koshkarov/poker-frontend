export class GameStatus {
    private static readonly _waiting_for_players: string = "Waiting for players";
    private static readonly _pre_flop: string = "Pre-flop";
    private static readonly _flop: string = "Flop";
    private static readonly _turn: string = "Turn";
    private static readonly _river: string = "River";
    private static readonly _showdown: string = "Showdown";

    static get waiting_for_players(): string {
        return this._waiting_for_players;
    }

    static get pre_flop(): string {
        return this._pre_flop;
    }

    static get flop(): string {
        return this._flop;
    }

    static get turn(): string {
        return this._turn;
    }

    static get river(): string {
        return this._river;
    }

    static get showdown(): string {
        return this._showdown;
    }
}