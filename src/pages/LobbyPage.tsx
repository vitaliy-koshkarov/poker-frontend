import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTables } from "../api/pokerApi.ts";
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

	return (
		<div style={{ padding: "20px" }}>
            <h1>Lobby</h1>

            <ul>
                {tables.map(table => (
                    <li key={table.id}>
                        Table #{table.id}. Players: {table.players}/{table.maxPlayers}
                        {" "}
                        <Link to={`/table/${table.id}`}>Join</Link>
                    </li>
                ))}
            </ul>
            <br/>
            <br/>
            <button type="button" onClick={logout}>Logout</button>
            <br/>
            <br/>
            <Link to="/profile">Profile</Link>
        </div>
	);
}