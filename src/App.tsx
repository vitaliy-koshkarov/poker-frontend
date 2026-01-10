import { useEffect, useState } from "react";

function App() {
    const [status, setStatus] = useState("Loading...");

    useEffect(() => {
        fetch("http://localhost:8080/status")
          .then(res => res.text())
          .then(setStatus)
          .catch(() => setStatus("Backend not reachable"));
    }, []);

    return (
        <div style={{padding: "20px"}}>
            <h1>Poker. React test</h1>

            <button onClick={() => {
                console.log(Math.random());
            }}>Join table</button>
        </div>
    );
}

export default App;
