import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileInfo, updateProfileInfo, updatePassword } from "../../api/profileApi";
import { logout } from "../../api/authApi.ts";
import mainCss from "../Main.module.css";
import profileCss from "./Profile.module.css";

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
		<div className={mainCss.page}>
			<div className={mainCss.title}>Profile Page</div>
			{error && <p className={mainCss.errorMessage}>{error}</p>}

			<div className={profileCss.link}>
			    <Link to="/lobby">To lobby</Link>
			</div>

            <div className={profileCss.logoutBtn}>
			    <button type="button" onClick={logout}>Logout</button>
            </div>

			<form className={profileCss.form} onSubmit={updProfileInfo}>
				<div>
					<label>Email: </label>
					<input placeholder="Email" disabled value={email} onChange={e => setEmail(e.target.value)}/>
				</div>

				<div className={profileCss.inputNickname}>
					<label>Nickname: </label>
					<input placeholder="Enter your nickname" value={nickname} onChange={e => setNickname(e.target.value)}/>
				</div>

				<div className={profileCss.saveProfileInfoBtn}>
				    <button type="submit">Save profile info</button>
				    {profileInfoMessage && <p className={mainCss.successMessage}>{profileInfoMessage}</p>}
				</div>
			</form>

			<form className={profileCss.form} onSubmit={updPass}>
				<div>
				    <label>Old password: </label>
				    <input type="password" placeholder="Enter old password" value={oldPassword} onChange={e => setOldPassword(e.target.value)}/>
				</div>

			    <div className={profileCss.inputPassword}>
			        <label>New password: </label>
			        <input type="password" placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
			    </div>

				<div className={profileCss.savePasswordBtn}>
				    <button type="submit">Save password</button>
				    {passwordMessage && <p className={mainCss.successMessage}>{passwordMessage}</p>}
				</div>
			</form>
		</div>
	);
}