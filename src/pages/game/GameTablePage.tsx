import {useParams, Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Client} from "@stomp/stompjs";
import mainCss from "../Main.module.css";
import gameTableCss from "./GameTable.module.css";
import type {GameTable} from "../../model/GameTable.ts";

export default function GameTablePage() {
    const stompClientRef = useRef<Client | null>(null);
    const brokerURL = "ws://localhost:8080/ws/game";
    const brokerName = "gameTable";
    const appDestinationPrefix = "kv-poker-game";
    const {id} = useParams();
    const [gameTable, setGameTable] = useState<GameTable | null>(null);
    const [newGameName, setNewGameName] = useState("");

    useEffect(() => {

        const stompClient = new Client({
            brokerURL: `${brokerURL}`,
            onConnect: (connectFrame) => {
                console.log("Connected " + connectFrame);

                stompClient.subscribe(`/${brokerName}/${id}`, message => {
                    console.log("Received message: " + message)
                    console.log("Message: " + message.body)
                    const gameTableData: GameTable = JSON.parse(message.body);
                    console.log("Received:", gameTableData);
                    setGameTable(gameTableData);
                });

                stompClient.publish({
                    destination: `/${appDestinationPrefix}/${id}`,
                    body: id
                });
            },

            onDisconnect: (disconnectFrame) => {
                console.log("Disconnected " + disconnectFrame);
            },

            onStompError: (errorFrame) => {
                console.error("Error: " + errorFrame);
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
            destination: `/${appDestinationPrefix}/${id}`,
            body: newGameName
        });
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
                <p>Table ID: {id}</p>
                {gameTable && <p>Table name: {gameTable.name}</p>}
                {gameTable && <p>Table current players: {gameTable.currentPlayers}</p>}
                {gameTable && <p>Table max players: {gameTable.maxPlayers}</p>}
                {gameTable && <p>Table buy-in: {gameTable.buyIn}</p>}
            </div>
        </div>
    );
}
