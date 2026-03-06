import {useParams, Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Client} from "@stomp/stompjs";
import {getToken} from "../../auth/token.ts";
import mainCss from "../Main.module.css";
import gameCss from "./GamePage.module.css";
import {PlayersTable} from "../../components/game/PlayersTable.tsx";
import {GameTable} from "../../components/game/GameTable.tsx";
import type {GameState} from "../../model/GameState.ts";

export default function GamePage() {
    const stompClientRef = useRef<Client | null>(null);
    const brokerURL = "ws://localhost:8080/ws/game";
    const brokerDestinationPrefix = "topic";
    const currentDestination = "gameTable"; // TODO: rename to something more appropriate
    const appDestinationPrefix = "kv-poker-game";
    const publishMessageName = "table"; // TODO: rename to something more appropriate
    const {id} = useParams();
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [newGameName, setNewGameName] = useState("");

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
        const stompClient = new Client({
            brokerURL: `${brokerURL}`,
            connectHeaders: {
                Authorization: "Bearer " + getToken()
            },
            onConnect: (connectFrame) => {
                console.log("Connected " + connectFrame);

                stompClient.subscribe(
                    `/${appDestinationPrefix}/${currentDestination}/${id}`,
                    subscribeMessageCallback => {
                        // receive init data after subscription
                        console.log("Subscribe message: " + subscribeMessageCallback);
                        console.log("Subscribe message body: " + subscribeMessageCallback.body);
                        const initGameStateData: GameState = JSON.parse(subscribeMessageCallback.body);
                        setGameState(initGameStateData);
                    }
                );

                stompClient.subscribe(
                    `/${brokerDestinationPrefix}/${currentDestination}/${id}`,
                    messageCallback => {
                        // receive game table data after Send (some action from player)
                        console.log("Received message: " + messageCallback);
                        console.log("Message body: " + messageCallback.body);
                        const gameStateData: GameState = JSON.parse(messageCallback.body).payload;
                        setGameState(gameStateData);
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

    function handleClick() {
        console.log("new game name: " + newGameName);
        stompClientRef.current?.publish({
            destination: `/${appDestinationPrefix}/${publishMessageName}/${id}`,
            body: newGameName // TODO: null check
        });
        setNewGameName("");
    }

    return (
        <div className={mainCss.page}>
            <div className={mainCss.title}>Game page</div>

            <div className={gameCss.link}>
                <Link to="/lobby">Back to lobby</Link>
            </div>

            <div className={gameCss.gameInfo}>
                <div>
                    <input placeholder="Game name" value={newGameName}
                           onChange={e => setNewGameName(e.target.value)}/>
                    <button type="button" onClick={handleClick}>Change game name</button>
                </div>
            </div>
            {gameState && <GameTable game={gameState.game}/>}
            {gameState && <PlayersTable players={gameState.players}/>}
        </div>
    );
}
