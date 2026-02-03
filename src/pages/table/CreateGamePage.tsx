import { useState } from "react";
import { createGame } from "../../api/tables/tablesApi";

export default function CreateGamePage() {
	const [name, setName] = useState("");
	const [maxPlayers, setMaxPlayers] = useState(2);
	const [buyIn, setBuyIn] = useState(50);

	return (
		<div style={{"padding" : "0px 0px 0px 20px"}}>
			<h3>Choose parameters of the game</h3>

			<div>
				<label>Name: </label>
				<input placeholder="Enter game name" value={name} onChange={e => setName(e.target.value)}/>
			</div>

			<div style={{"padding" : "20px 0px 0px 0px"}}>
				<label>Max players: </label>
				<select value={maxPlayers} onChange={e => setMaxPlayers(e.target.value)}>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
				</select>
			</div>

			<div style={{"padding" : "20px 0px 0px 0px"}}>
				<label>Buy-in: </label>
				<select value={buyIn} onChange={e => setBuyIn(e.target.value)}>
					<option value="50">50</option>
					<option value="100">100</option>
					<option value="200">200</option>
					<option value="500">500</option>
					<option value="1000">1 000</option>
				</select>
			</div>
			<div style={{"padding" : "30px 0px 0px 0px"}}>
				<button type="button" onClick={() => createGame(maxPlayers, buyIn, name) }>Create game</button>
			</div>
		</div>
	);
}