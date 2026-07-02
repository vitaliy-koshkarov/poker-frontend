import gameCss from "../../../assets/css/game/GamePage.module.css";
import {startGame} from "../../../api/game/gameApi.ts";
import {StartGameRequest} from "./StartGameRequest.ts";
import type {StartGameBtnProps} from "./StartGameBtnProps.ts";

export function StartGameBtn({gameId, playerId, isDisabled}: StartGameBtnProps) {

    function handleClick() {
        console.log("Start new game id " + gameId + " by player id " + playerId + " disabled " + isDisabled);

        startGame(new StartGameRequest(gameId, playerId));
    }

    return (
        <div className={gameCss.gameInfo}>
            <button type="button" disabled={isDisabled} onClick={handleClick}>Start game</button>
        </div>
    );
}