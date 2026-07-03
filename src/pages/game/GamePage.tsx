import {useParams, Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Client} from "@stomp/stompjs";
import {getToken} from "../../auth/token.ts";
import mainCss from "../../assets/css/Main.module.css";
import gameCss from "../../assets/css/game/GamePage.module.css";
import {PlayersTable} from "../../components/game/PlayersTable.tsx";
import {GameTable} from "../../components/game/GameTable.tsx";
import {StartGameBtn} from "../../components/game/buttons/StartGameBtn.tsx";
import {
    brokerURL,
    subscribeInitGamePath,
    subscribeToReceiveGameStateDataPath,
    playerActionPath,
} from "../../auth/paths.ts";
import {getCurrentPlayerId} from "../../api/authApi.ts";
import {PlayerActionBtn} from "../../components/game/buttons/PlayerActionBtn.tsx";
import {Player} from "../../model/Player.ts";
import type {Game} from "../../model/Game.ts";
import {GameStatus} from "../../model/GameStatus.ts";

export default function GamePage() {
    const stompClientRef = useRef<Client | null>(null);
    const {id} = useParams();
    const [game, setGame] = useState<Game | null>(null);
    const [currentPlayerId, setCurrentPlayerId] = useState<number>(0);

    function hasPlayerAlreadyJoined(players: Player[]) {
        for (let player of players) {
            if (player.id == currentPlayerId) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        /* TODO: implement WebSocket connection on App level. For example:
            <App>
              <WebSocketProvider>
                <Router>
                  <Lobby/>
                  <Game/>
                </Router>
              </WebSocketProvider>
            </App>*/

        getCurrentPlayerId()
            .then(data => {
                console.log("Current player id " + data);
                setCurrentPlayerId(data)
            });

        const stompClient = new Client({
            brokerURL: `${brokerURL}`,
            connectHeaders: {
                Authorization: "Bearer " + getToken()
            },
            onConnect: (connectFrame) => {
                console.log("Connected " + connectFrame);

                stompClient.subscribe(
                    `${subscribeInitGamePath}/${id}`,
                    subscribeMessageCallback => {
                        // receive init data after subscription
                        console.log("Subscribe message: " + subscribeMessageCallback);
                        console.log("Subscribe message body: " + subscribeMessageCallback.body);
                        const initGameData: Game = JSON.parse(subscribeMessageCallback.body);
                        setGame(initGameData);
                    }
                );

                stompClient.subscribe(
                    `${subscribeToReceiveGameStateDataPath}/${id}`,
                    messageCallback => {
                        // receive game table data after Send (some action from player)
                        console.log("Received message: " + messageCallback);
                        console.log("Message body: " + messageCallback.body);
                        const gameData: Game = JSON.parse(messageCallback.body).payload;
                        setGame(gameData);
                    }
                );
            },

            onDisconnect: (disconnectFrame) => {
                console.log("Client disconnected: " + disconnectFrame);
            },

            onStompError: (errorFrame) => {
                console.error("STOMP error: " + errorFrame);
            },

            onUnhandledFrame: (unhandledFrame) => {
                console.log("Unhandled frame: " + unhandledFrame);
            },

            onUnhandledMessage: (unhandledMessage) => {
                console.log("Unhandled message: ", unhandledMessage);
            },

            onUnhandledReceipt: (unhandledReceipt) => {
                console.log("Unhandled receipt: ", unhandledReceipt);
            }
        });

        stompClient.activate();

        stompClientRef.current = stompClient;

        return () => {
            stompClient.deactivate();
        };
    }, [id]);

    return (
        <div className={mainCss.page}>
            <div className={mainCss.title}>Game page</div>

            <div className={gameCss.link}>
                <Link to="/lobby">Back to lobby</Link>
            </div>

            {game?.status == GameStatus.waiting_for_players && <PlayerActionBtn btnName={"Join the table"}
                                                                stompClient={stompClientRef}
                                                                playerId={currentPlayerId}
                                                                path={`${playerActionPath}/${game.id}/action`}
                                                                disabled={hasPlayerAlreadyJoined(game.players) || (game.players.length >= game.maxPlayers)}
                                                                actionName={"JOIN"}></PlayerActionBtn>
            }

            {game?.status == GameStatus.waiting_for_players
                && (game.creatorPlayerId === currentPlayerId)
                && <StartGameBtn gameId={game.id}
                                 playerId={currentPlayerId}
                                 isDisabled={ !hasPlayerAlreadyJoined(game.players) }/>
            }

            {game && <GameTable game={game}/>}

            {game &&
                <PlayersTable stompClient={stompClientRef}
                              game={game}
                              currentPlayerId={currentPlayerId}/>
            }
        </div>
    );
}
