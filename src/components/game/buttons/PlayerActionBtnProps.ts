import type {RefObject} from "react";
import type {Client} from "@stomp/stompjs";

export interface PlayerActionBtnProps {
    btnName: string,
    stompClient: RefObject<Client | null>,
    playerId: number,
    path: string,
    disabled: boolean,
    actionName: string;
}