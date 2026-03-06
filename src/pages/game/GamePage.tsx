import {useParams, Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Client} from "@stomp/stompjs";
import {getToken} from "../../auth/token.ts";
import type {Game} from "../../model/Game.ts";
import mainCss from "../Main.module.css";
import gameCss from "./Game.module.css";

export default function GamePage() {
    const stompClientRef = useRef<Client | null>(null);
    const brokerURL = "ws://localhost:8080/ws/game";
    const brokerDestinationPrefix = "topic";
    const currentDestination = "game"; // TODO: rename to something more appropriate
    const appDestinationPrefix = "kv-poker-game";
    const publishMessageName = "table"; // TODO: rename to something more appropriate
    const {id} = useParams();
    const [game, setGame] = useState<Game | null>(null);
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
                        const initData: Game = JSON.parse(subscribeMessageCallback.body);
                        setGame(initData);
                    }
                );

                stompClient.subscribe(
                    `/${brokerDestinationPrefix}/${currentDestination}/${id}`,
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
                <div className={gameCss.gameTitle}>Game {game?.name}</div>
                <div>
                    <input placeholder="Game name" value={newGameName}
                           onChange={e => setNewGameName(e.target.value)}/>
                    <button type="button" onClick={handleClick}>Change game name</button>
                </div>

                {game && <p>Game ID: {game.id}</p>}
                {game && <p>Name: {game.name}</p>}
                {game && <p>Current players: {game.currentPlayers}</p>}
                {game && <p>Max players: {game.maxPlayers}</p>}
                {game && <p>Buy-in: {game.buyIn}</p>}
                {game && <p>status: {game.status}</p>}
            </div>
        </div>
    );
}
