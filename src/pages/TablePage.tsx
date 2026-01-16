import { useParams, Link } from "react-router-dom";

export default function TablePage() {
    const { tableId } = useParams();

    return (
        <div style={{ padding: "20px" }}>
            <h1>Table #{tableId}</h1>
            <p>Waiting for players...</p>

            <Link to="/">Back to lobby</Link>
        </div>
    );
}
