import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchGames, deleteGame } from "../../api/games/gamesApi.ts";
import { logout } from "../../api/authApi.ts";
import type { Table } from "../../model/Table";
import mainCss from "../Main.module.css";
import lobbyCss from "./Lobby.module.css";

export default function Lobby() {
    const [games, setGames] = useState<Table[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchGames()
        .then(setGames)
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
                            {games.map(game => (
                                <tr key={game.id} className={lobbyCss.tr}>
                                    <td className={lobbyCss.td}>{game.id}</td>
                                    <td className={lobbyCss.td}>{game.name}</td>
                                    <td className={lobbyCss.td}>{game.currentPlayers}/{game.maxPlayers}</td>
                                    <td className={lobbyCss.td}>{game.buyIn}</td>
                                    <td className={lobbyCss.td}>
                                        <Link to={`/game/${game.id}`}>Join</Link>
                                    </td>
                                    <td className={lobbyCss.td}>
                                        <button type="button" onClick={() => deleteGame(game.id)}>Delete</button>
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