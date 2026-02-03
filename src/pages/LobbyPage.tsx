import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchTables } from "../api/tables/tablesApi.ts";
import { logout } from "../api/authApi.ts";
import type { Table } from "../model/Table";

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
		<div style={{ "padding": "10px 0px 0px 10px" }}>
            <div>
                <Link to="/profile">Profile</Link>
            </div>
            
            <div>
                <button style={{ "margin": "20px 0px 0px 0px" }} type="button" onClick={logout}>Logout</button>
            </div>
            
            <div>
                <h2>Lobby</h2>

                <div>
                    <button type="button" onClick={redirectToCreateTablePage}>Create game</button>
                </div>

                <ul>
                    {tables.map(table => (
                        <li key={table.id}>
                            Table #{table.id}. Players: {table.players}/{table.maxPlayers}
                            {" "}
                            <Link to={`/table/${table.id}`}>Join</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
	);
}