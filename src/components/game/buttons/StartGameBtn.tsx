import gameCss from "../../../assets/css/game/GamePage.module.css";
import {startGame} from "../../../api/game/gameApi.ts";
import {StartGameRequest} from "./StartGameRequest.ts";

export function StartGameBtn(req: StartGameRequest) {

    function handleClick() {
        console.log("Start new game id " + req.gameId + " by player id " + req.playerId);

        startGame(req);
    }

    return (
        <div className={gameCss.gameInfo}>
            <button type="button" onClick={handleClick}>Start game</button>
        </div>
    );
}