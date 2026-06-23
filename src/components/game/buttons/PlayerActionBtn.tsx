import type {PlayerActionBtnProps} from "./PlayerActionBtnProps.ts";
import {PlayerActionRequest} from "./PlayerActionRequest.ts";

export function PlayerActionBtn({btnName, stompClient, player, path, disabled, action}: PlayerActionBtnProps) {
    // TODO: btn disabled depending on the game status

    function handleClick() {
        console.log("Player " + player.id + " action " + action + " to " + path);
        //     TODO: send player action
        stompClient.current?.publish({
            destination: path,
            body: JSON.stringify(new PlayerActionRequest(action))
        });
    }

    return (
        <button disabled={disabled} onClick={handleClick}>{btnName}</button>
    );
}