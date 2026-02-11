import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import mainCss from "../Main.module.css";
import gameTableCss from "./GameTable.module.css";

export default function GameTablePage() {
    const socketRef = useRef<WebSocket | null>(null);
    const { id } = useParams();
    const [gameTable, setGameTable] = useState();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Try to ws connect with table id " + id);
        const socket = new WebSocket("ws://localhost:8080/ws/game");

        socket.onopen = () => {
            console.log("WebSocket connected");
            socket.send(JSON.stringify({gameTableId: id}));
        };

        socket.onmessage = (event) => {
            const gameTableData = JSON.parse(event.data);
            console.log("Received:", gameTableData);
            setGameTable(gameTableData);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        socketRef.current = socket;

        return () => {
            socket.close();
        };
    }, [id]);

    return (
        <div className={mainCss.page}>
            <div className={mainCss.title}>Game table</div>
            {error && <p className={mainCss.errorMessage}>{error}</p>}

            <div className={gameTableCss.link}>
                <Link to="/lobby">Back to lobby</Link>
            </div>

            <div style={{"padding" : "20px 0px 20px 0px"}}>Page id: {id}</div>

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
