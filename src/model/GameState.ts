import type {Player} from "./Player.ts";
import type {Game} from "./Game.ts";

export type GameState = {
    gameDTO: Game;
    playerDTOList: Player[];
};
