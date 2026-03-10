import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createGameRequest} from "../../api/games/gamesApi";
import mainCss from "../Main.module.css";
import createGameCss from "./CreateGame.module.css";

export default function CreateGamePage() {
    const [name, setName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(2);
    const [buyIn, setBuyIn] = useState(50);

    const navigateTo = useNavigate();

    function createGame(maxPlayers: number, buyIn: number, name: string) {
        createGameRequest(maxPlayers, buyIn, name)
        .then(returnBack);
    }

    function returnBack() {
        navigateTo("/lobby");
    }

    return (
        <div className={mainCss.page}>
            <div className={mainCss.title}>
                <label>Choose parameters of the game</label>
            </div>

            <div className={createGameCss.gameNameInput}>
                <label>Name: </label>
                <input placeholder="Enter game name" value={name}
                       onChange={e => setName(e.target.value)}/>
            </div>

            <div className={createGameCss.maxPlayersInput}>
                <label>Max players: </label>
                <select value={maxPlayers}
                        onChange={e => setMaxPlayers(Number(e.target.value))}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>

            <div className={createGameCss.divBuyIn}>
                <label>Buy-in: </label>
                <select value={buyIn}
                        onChange={e => setBuyIn(Number(e.target.value))}>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="500">500</option>
                    <option value="1000">1 000</option>
                </select>
            </div>

            <div className={createGameCss.createGameBtn}>
                <button type="button"
                        onClick={() => createGame(maxPlayers, buyIn, name)}>
                    Create game
                </button>
            </div>

            <div className={createGameCss.backBtn}>
                <button type="button" onClick={returnBack}>Back</button>
            </div>
        </div>
    );
}