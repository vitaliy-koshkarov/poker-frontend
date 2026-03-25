import type {RefObject} from "react";
import type {Client} from "@stomp/stompjs";

export interface PlayerActionBtnProps {
    stompClient: RefObject<Client | null>,
    path: string,
    name: string,
    playerId: bigint
}