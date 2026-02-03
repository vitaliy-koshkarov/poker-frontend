import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchTables, deleteTable } from "../../api/tables/tablesApi.ts";
import { logout } from "../../api/authApi.ts";
import type { Table } from "../../model/Table";
import styles from "./Table.module.css";

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
		<div className={styles.lobbyPage}>
            <div>
                <Link to="/profile">Profile</Link>
            </div>

            <div className={styles.logoutBtn}>
                <button  type="button" onClick={logout}>Logout</button>
            </div>

            <div>
                <h2>Lobby</h2>

                <div>
                    <button type="button" onClick={redirectToCreateTablePage}>Create game</button>
                </div>

                <div className={styles.divTable}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Id</td>
                                <td className={styles.td}>Name</td>
                                <td className={styles.td}>Players</td>
                                <td className={styles.td}>Buy-in</td>
                                <td className={styles.td}>Join</td>
                                <td className={styles.td}>Remove game</td>
                            </tr>
                        </thead>

                        <tbody>
                            {tables.map(table => (
                                <tr key={table.id} className={styles.tr}>
                                    <td className={styles.td}>{table.id}</td>
                                    <td className={styles.td}>{table.name}</td>
                                    <td className={styles.td}>{table.currentPlayers}/{table.maxPlayers}</td>
                                    <td className={styles.td}>{table.buyIn}</td>
                                    <td className={styles.td}>
                                        <Link to={`/table/${table.id}`}>Join</Link>
                                    </td>
                                    <td className={styles.td}>
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