import type {PlayerActionBtnProps} from "./PlayerActionBtnProps.ts";

export function PlayerActionBtn({name, playerId, path, disabled}: PlayerActionBtnProps) {
    // TODO: btn disabled depending on the game status

    function handleClick() {
        console.log("Player " + playerId + " " + name + " to " + path);
        //     TODO: send player action
    }

    return (
        <button disabled={disabled} onClick={handleClick}>{name}</button>
    );
}