import {useParams, Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Client} from "@stomp/stompjs";
import {getToken} from "../../auth/token.ts";
import type {GameTable} from "../../model/GameTable.ts";
import mainCss from "../Main.module.css";
import gameTableCss from "./GameTable.module.css";

export default function GameTablePage() {
    const stompClientRef = useRef<Client | null>(null);
    const brokerURL = "ws://localhost:8080/ws/game";
    const brokerDestinationPrefix = "topic";
    const currentDestination = "gameTable"; // TODO: rename to something more appropriate
    const appDestinationPrefix = "kv-poker-game";
    const publishMessageName = "table"; // TODO: rename to something more appropriate
    const {id} = useParams();
    const [gameTable, setGameTable] = useState<GameTable | null>(null);
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
                        const initData: GameTable = JSON.parse(subscribeMessageCallback.body);
                        setGameTable(initData);
                    }
                );

                stompClient.subscribe(
                    `/${brokerDestinationPrefix}/${currentDestination}/${id}`,
                    messageCallback => {
                        // receive game table data after Send (some action from player)
                        console.log("Received message: " + messageCallback);
                        console.log("Message body: " + messageCallback.body);
                        const gameTableData: GameTable = JSON.parse(messageCallback.body).payload;
                        setGameTable(gameTableData);
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
            <div className={mainCss.title}>Game table</div>

            <div className={gameTableCss.link}>
                <Link to="/lobby">Back to lobby</Link>
            </div>

            <div style={{"padding": "20px 0px 20px 0px"}}>Page id: {id}</div>
            <div>
                <input placeholder="Game name" value={newGameName}
                       onChange={e => setNewGameName(e.target.value)}/>
                <button type="button" onClick={handleClick}>Change game name</button>
            </div>

            <div className={gameTableCss.gameTableInfo}>
                <div className={gameTableCss.gameTableTitle}>Game Table</div>
                {gameTable && <p>Table ID: {gameTable.id}</p>}
                {gameTable && <p>Table name: {gameTable.name}</p>}
                {gameTable && <p>Table current players: {gameTable.currentPlayers}</p>}
                {gameTable && <p>Table max players: {gameTable.maxPlayers}</p>}
                {gameTable && <p>Table buy-in: {gameTable.buyIn}</p>}
            </div>
        </div>
    );
}
