import type {RefObject} from "react";
import type {Client} from "@stomp/stompjs";
import type {GameState} from "../../model/GameState.ts";

export type PlayerTableProps = {
    stompClient: RefObject<Client | null>,
    gameState: GameState,
    currentPlayerId: bigint;
}