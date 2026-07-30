import gameCss from "../../../assets/css/game/GamePage.module.css";
import {startGame} from "../../../api/game/gameApi.ts";
import {StartGameRequest} from "./StartGameRequest.ts";
import type {StartGameBtnProps} from "./StartGameBtnProps.ts";
import {handleErrorMessage} from "../../../api/handleErrorMessage.ts";
import mainCss from "../../../assets/css/Main.module.css";

export function StartGameBtn({gameId, playerId, isDisabled}: StartGameBtnProps) {
    const {errorMessage, showErrorMessage, clearErrorMessage} = handleErrorMessage();

    function handleClick() {
        console.log("Start new game id " + gameId + ", player id " + playerId);

        startGame(new StartGameRequest(gameId, playerId))
            .then(() => clearErrorMessage())
            .catch(error => showErrorMessage(error));
    }

    return (
        <div className={gameCss.gameInfo}>
            <button type="button" disabled={isDisabled} onClick={handleClick}>Start game</button>
            {errorMessage && <p className={mainCss.errorMessage}>{errorMessage}</p>}
        </div>
    );
}