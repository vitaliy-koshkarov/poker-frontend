import type {PlayerActionBtnProps} from "./PlayerActionBtnProps.ts";
import {PlayerActionRequest} from "./PlayerActionRequest.ts";

export function PlayerActionBtn({btnName, stompClient, playerId, path, disabled, actionName}: PlayerActionBtnProps) {

    function handleClick() {
        console.log("Player " + playerId + " action " + actionName + " to " + path);

        stompClient.current?.publish({
            destination: path,
            body: JSON.stringify(new PlayerActionRequest(actionName))
        });
    }

    return (
        <button disabled={disabled} onClick={handleClick}>{btnName}</button>
    );
}