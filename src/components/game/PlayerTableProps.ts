import type {RefObject} from "react";
import type {Client} from "@stomp/stompjs";
import type {Game} from "../../model/Game.ts";

export type PlayerTableProps = {
    stompClient: RefObject<Client | null>,
    game: Game,
    currentPlayerId: number;
}