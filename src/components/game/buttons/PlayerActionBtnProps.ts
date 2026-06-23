import type {RefObject} from "react";
import type {Client} from "@stomp/stompjs";
import type {Player} from "../../../model/Player.ts";

export interface PlayerActionBtnProps {
    btnName: string,
    stompClient: RefObject<Client | null>,
    player: Player,
    path: string,
    disabled: boolean,
    action: string;
}