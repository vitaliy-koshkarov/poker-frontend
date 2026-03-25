import type {RefObject} from "react";
import type {Client} from "@stomp/stompjs";

export interface StartGameBtnProps {
    stompClient: RefObject<Client | null>,
    path: string,
    gameId: bigint
}