import type {RefObject} from "react";
import type {Client} from "@stomp/stompjs";

export interface PlayerActionBtnProps {
    stompClient: RefObject<Client | null>,
    playerId: bigint,
    path: string,
    name: string,
    disabled: boolean;
}