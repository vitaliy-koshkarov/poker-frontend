import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import {fetchGames, deleteGame} from "../../api/game/gameApi.ts";
import {getCurrentPlayerId, logout} from "../../api/authApi.ts";
import mainCss from "../../assets/css/Main.module.css";
import lobbyCss from "../../assets/css/lobby/Lobby.module.css";
import type {Game} from "../../model/Game.ts";

export default function LobbyPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentPlayerId, setCurrentPlayerId] = useState<number>(0);

    useEffect(() => {
        getCurrentPlayerId()
            .then(data => {
                console.log("Current player id " + data);
                setCurrentPlayerId(data)
            });

        fetchGames()
            .then(setGames)
            .catch(err => setError(err.message));
    }, []);

    const navigateTo = useNavigate();

    const redirectToCreateGamePage = () => {
        navigateTo("/createGame");
    }

    const navigateToGame = (gameId: number) => {
        navigateTo(`/game/${gameId}`)
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
                {error && <p className={mainCss.errorMessage}>{error}</p>}

                <div className={lobbyCss.createGameBtn}>
                    <button type="button" onClick={redirectToCreateGamePage}>Create game</button>
                </div>

                <div className={lobbyCss.divTable}>
                    <table className={lobbyCss.table}>
                        <thead className={lobbyCss.thead}>
                        <tr className={lobbyCss.tr}>
                            <td className={lobbyCss.td}>Id</td>
                            <td className={lobbyCss.td}>Name</td>
                            <td className={lobbyCss.td}>Players</td>
                            <td className={lobbyCss.td}>Buy-in</td>
                            <td className={lobbyCss.td}>Status</td>
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
                                <td className={lobbyCss.td}>{game.status}</td>
                                <td className={lobbyCss.td}>
                                    <button className={lobbyCss.joinGameBtn} type="button"
                                            onClick={() => navigateToGame(game.id)}>
                                        Join game
                                    </button>
                                </td>
                                <td className={lobbyCss.td}>
                                    <button className={lobbyCss.deleteBtn} type="button"
                                            disabled={currentPlayerId != game.creatorPlayerId}
                                            onClick={() => deleteGame(game.id)}>
                                        Delete
                                    </button>
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