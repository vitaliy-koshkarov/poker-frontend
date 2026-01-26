import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTables } from "../api/pokerApi.ts";
import { logout } from "../api/authApi.ts";
import type { Table } from "../model/Table";

export default function Lobby() {
    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTables()
            .then(setTables)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading tables...</p>;

    if (error) return <p>Error: {error}</p>;

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
        </div>
	);
}