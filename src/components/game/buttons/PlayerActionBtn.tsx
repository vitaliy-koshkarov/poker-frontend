import type {PlayerActionBtnProps} from "./PlayerActionBtnProps.ts";

export function PlayerActionBtn({name, path, playerId}: PlayerActionBtnProps) {

    function handleClick() {
        console.log("Player " + playerId + " " + name + " to " + path);
    //     TODO: send player action
    }

    return (
        <button onClick={handleClick}>{name}</button>
    );
}