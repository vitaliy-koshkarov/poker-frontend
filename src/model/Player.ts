export class Player {
    id: number;
    nickname: string;
    status: number;
    chips: number;
    currentBet: number;

    constructor(id: number, nickname: string, status: number, chips: number, currentBet: number) {
        this.id = id;
        this.nickname = nickname;
        this.status = status;
        this.chips = chips;
        this.currentBet = currentBet;
    }
}
