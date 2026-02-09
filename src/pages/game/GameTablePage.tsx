import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGamesById } from "../../api/games/gamesApi";
import mainCss from "../Main.module.css";
import gameTableCss from "./GameTable.module.css";
import type { GameTable } from "../../model/GameTable";

export default function GameTablePage() {
    const { id } = useParams();
    const [gameTable, setGameTable] = useState();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchGamesById(id)
        .then(setGameTable)
        .catch(err => setError(err.message));
    }, []);

    return (
        <div className={mainCss.page}>
            <div className={mainCss.title}>Game table</div>
            {error && <p className={mainCss.errorMessage}>{error}</p>}

            <div className={gameTableCss.link}>
                <Link to="/lobby">Back to lobby</Link>
            </div>

            <div style={{"padding" : "20px 0px 20px 0px"}}>Page id: {id}</div>
            {gameTable && <div>Id: {gameTable.id}</div>}
            {gameTable && <div>Current players: {gameTable.currentPlayers}</div>}
            {gameTable && <div>Max players: {gameTable.maxPlayers}</div>}
            {gameTable && <div>Buy-in: {gameTable.buyIn}</div>}
            {gameTable && <div>Name: {gameTable.name}</div>}
        </div>
    );
}
