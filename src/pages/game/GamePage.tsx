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
    const currentDestination = "gameTable"; // TODO: rename to something more appropriate
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

                <div>
                    <table className={gameCss.gameTable}>
                        <thead>
                        <tr>
                            <td className={gameCss.td}>Game ID</td>
                            <td className={gameCss.td}>Name</td>
                            <td className={gameCss.td}>Current players</td>
                            <td className={gameCss.td}>Max players</td>
                            <td className={gameCss.td}>Buy-in</td>
                            <td className={gameCss.td}>Status</td>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td className={gameCss.td}>{game?.id}</td>
                            <td className={gameCss.td}>{game?.name}</td>
                            <td className={gameCss.td}>{game?.currentPlayers}</td>
                            <td className={gameCss.td}>{game?.maxPlayers}</td>
                            <td className={gameCss.td}>{game?.buyIn}</td>
                            <td className={gameCss.td}>{game?.status}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={gameCss.players}>
                <div className={gameCss.playersTitle}>Players</div>
                <table className={gameCss.playersTable}>
                    <thead className={gameCss.thead}>
                    <tr>
                        <td className={gameCss.td}>Id</td>
                        <td className={gameCss.td}>Nickname</td>
                        <td className={gameCss.td}>Status</td>
                        <td className={gameCss.td}>Chips</td>
                        <td className={gameCss.td}>Current bet</td>
                    </tr>
                    </thead>

                    <tbody>
                    {game?.players?.map(player => (
                        <tr key={player.id}>
                            <td className={gameCss.td}>{player.id}</td>
                            <td className={gameCss.td}>{player.nickname}</td>
                            <td className={gameCss.td}>{player.status}</td>
                            <td className={gameCss.td}>{player.chips}</td>
                            <td className={gameCss.td}>{player.currentBet}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
