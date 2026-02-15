import {useParams, Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import mainCss from "../Main.module.css";
import gameTableCss from "./GameTable.module.css";
import type {GameTable} from "../../model/GameTable.ts";

export default function GameTablePage() {
    const socketRef = useRef<WebSocket | null>(null);
    const {id} = useParams();
    const [gameTable, setGameTable] = useState<GameTable | null>(null);

    useEffect(() => {
        console.log("Try to ws connect with table id " + id);
        const socket = new WebSocket("ws://localhost:8080/ws/game");

        socket.onopen = () => {
            console.log("WebSocket connected");
            socket.send(JSON.stringify({gameTableId: id}));
        };

        socket.onmessage = (messageEvent) => {
            const gameTableData = JSON.parse(messageEvent.data);
            console.log("Received:", gameTableData);
            setGameTable(gameTableData);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        socket.onerror = errorEvent => {
            console.error("Error: " + errorEvent);
        };

        socketRef.current = socket;

        return () => {
            socket.close();
        };
    }, [id]);

    return (
        <div className={mainCss.page}>
            <div className={mainCss.title}>Game table</div>

            <div className={gameTableCss.link}>
                <Link to="/lobby">Back to lobby</Link>
            </div>

            <div style={{"padding": "20px 0px 20px 0px"}}>Page id: {id}</div>
            <div>
                <input placeholder="Game name"/>
                <button type="button">Change game name</button>
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
