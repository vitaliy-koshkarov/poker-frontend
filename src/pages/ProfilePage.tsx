import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileInfo, updateProfileInfo, updatePassword } from "../api/profileApi";
import { logout } from "../api/authApi.ts";

export default function ProfilePage() {
	const [email, setEmail] = useState("");
	const [nickname, setNickname] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [profileInfoMessage, setProfileInfoMessage] = useState("");
	const [passwordMessage, setPasswordMessage] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
        getProfileInfo()
    	.then(data => {
            setEmail(data.email);
            setNickname(data.nickname);
        })
        .catch(error => setError(error.message));
  	}, []);

	async function updProfileInfo(e: React.FormEvent) {
    	e.preventDefault();
		await updateProfileInfo(email, nickname);
		setProfileInfoMessage("Profile updated");
    }

    async function updPass(e: React.FormEvent) {
    	e.preventDefault();

    	await updatePassword(oldPassword, newPassword);

    	setOldPassword("");
    	setNewPassword("");
    	setPasswordMessage("Password updated successfully");
    }

	return (
		<div>
			<h2>Profile Page</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}

			<Link to="/lobby">To lobby</Link>
			<br/>
			<br/>

			<button type="button" onClick={logout}>Logout</button>

			<form onSubmit={updProfileInfo}>
				<br/>
				<div>
					Email:
					<input placeholder="Email" disabled value={email} onChange={e => setEmail(e.target.value)}/>
				</div>
				<br/>
				<div>
					Nickname:
					<input placeholder="Enter your nickname" value={nickname} onChange={e => setNickname(e.target.value)}/>
				</div>
				<br/>
				<button type="submit">Save profile info</button>
				{profileInfoMessage && <p>{profileInfoMessage}</p>}
			</form>

			<br/>
			<br/>
			<form onSubmit={updPass}>
				Old password:
				<input type="password" placeholder="Enter old password" value={oldPassword} onChange={e => setOldPassword(e.target.value)}/>
				<br/>
				<br/>
				New password:
				<input type="password" placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
				<br/>
				<br/>
				<button type="submit">Save password</button>
				{passwordMessage && <p>{passwordMessage}</p>}
			</form>
		</div>
	);
}