import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchTables, deleteTable } from "../../api/tables/tablesApi.ts";
import { logout } from "../../api/authApi.ts";
import type { Table } from "../../model/Table";
import mainCss from "../Main.module.css";
import lobbyCss from "./Lobby.module.css";

export default function Lobby() {
    const [tables, setTables] = useState<Table[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTables()
        .then(setTables)
        .catch(err => setError(err.message));
    }, []);

    const navigateTo = useNavigate();

    const redirectToCreateTablePage = () => {
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
                    <button type="button" onClick={redirectToCreateTablePage}>Create game</button>
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
                            {tables.map(table => (
                                <tr key={table.id} className={lobbyCss.tr}>
                                    <td className={lobbyCss.td}>{table.id}</td>
                                    <td className={lobbyCss.td}>{table.name}</td>
                                    <td className={lobbyCss.td}>{table.currentPlayers}/{table.maxPlayers}</td>
                                    <td className={lobbyCss.td}>{table.buyIn}</td>
                                    <td className={lobbyCss.td}>
                                        <Link to={`/table/${table.id}`}>Join</Link>
                                    </td>
                                    <td className={lobbyCss.td}>
                                        <button type="button" onClick={() => deleteTable(table.id)}>Delete</button>
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