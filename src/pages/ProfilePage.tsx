import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileInfo, updateProfileInfo } from "../api/profileApi";

export default function ProfilePage() {
	const [email, setEmail] = useState("");
	const [nickname, setNickname] = useState("");

	async function updProfile(e: React.FormEvent) {
    	e.preventDefault();

    	console.log("Click updateProfileInfo")

    	const data = await updateProfileInfo(email, nickname);
    	console.log("Response data: " + data);
    }

    useEffect(() => {
    	getProfileInfo()
    		.then(data => {
    			setEmail(data.email);
    			setNickname(data.nickname);
    		});
  	}, []);

    async function updPass(e: React.FormEvent) {
    	e.preventDefault();

    	console.log("Click updatePassword")
    }

	return (
		<div>
			<h2>Profile Page</h2>

			<Link to="/lobby">To lobby</Link>
			<br/>
			<br/>

			<form onSubmit={updProfile}>
				<br/>
				<input placeholder="Email" disabled value={email} onChange={e => setEmail(e.target.value)}/>
				<br/>
				<br/>
				<input placeholder="Enter your nickname" value={nickname} onChange={e => setNickname(e.target.value)}/>
				<br/>
				<br/>
				<button type="submit">Save profile info</button>
			</form>
			<br/>
			<br/>
			<br/>

			<form onSubmit={updPass}>
				<input placeholder="Old password"/>
				<br/>
				<br/>
				<input placeholder="New password"/>
				<br/>
				<br/>
				<button type="submit">Save password</button>
			</form>
		</div>
	);
}