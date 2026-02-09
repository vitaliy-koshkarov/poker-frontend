import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchGames, deleteGame, joinGame } from "../../api/games/gamesApi.ts";
import { logout } from "../../api/authApi.ts";
import mainCss from "../Main.module.css";
import lobbyCss from "./Lobby.module.css";
import type { GameTable } from "../../model/GameTable";

export default function LobbyPage() {
    const [gameTables, setGameTables] = useState<GameTable[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchGames()
        .then(setGameTables)
        .catch(err => setError(err.message));
    }, []);

    const navigateTo = useNavigate();

    const redirectToCreateGamePage = () => {
        navigateTo("/createGame");
    }

	return (
		<div className={mainCss.page}>
            <div>
                <Link to="/profile">Profile</Link>
            </div>

            <div className={lobbyCss.logoutBtn}>
                <button type="button" onClick={logout}>Logout</button>
            </div>

            <div>
                <div className={mainCss.title}>Lobby</div>

                <div className={lobbyCss.createGameBtn}>
                    <button type="button" onClick={redirectToCreateGamePage}>Create game</button>
                </div>

                <div className={lobbyCss.divTable}>
                    <table className={lobbyCss.table}>
                        <thead>
                            <tr className={lobbyCss.tr}>
                                <td className={lobbyCss.td}>Id</td>
                                <td className={lobbyCss.td}>Name</td>
                                <td className={lobbyCss.td}>Players</td>
                                <td className={lobbyCss.td}>Buy-in</td>
                                <td className={lobbyCss.td}>Join</td>
                                <td className={lobbyCss.td}>Remove game</td>
                            </tr>
                        </thead>

                        <tbody>
                            {gameTables.map(gameTable => (
                                <tr key={gameTable.id} className={lobbyCss.tr}>
                                    <td className={lobbyCss.td}>{gameTable.id}</td>
                                    <td className={lobbyCss.td}>{gameTable.name}</td>
                                    <td className={lobbyCss.td}>{gameTable.currentPlayers}/{gameTable.maxPlayers}</td>
                                    <td className={lobbyCss.td}>{gameTable.buyIn}</td>
                                    <td className={lobbyCss.td}>
                                        <button type="button" onClick={() => joinGame(gameTable)}>Join game</button>
                                    </td>
                                    <td className={lobbyCss.td}>
                                        <button type="button" onClick={() => deleteGame(gameTable.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
	);
}