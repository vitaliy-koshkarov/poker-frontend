import gameCss from "../../pages/game/GamePage.module.css";
import type {StartGameBtnProps} from "./StartGameBtnProps.ts";

export function StartGameBtn({stompClient, path, gameId}: StartGameBtnProps) {

    function handleClick() {
        console.log("Start new game " + gameId);
        stompClient.current?.publish({
            destination: path
        });
    }

    return (
        <div className={gameCss.gameInfo}>
            <button type="button" onClick={handleClick}>Start game</button>
        </div>
    );
}