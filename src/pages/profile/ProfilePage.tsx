import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {getProfileInfo, updateProfileInfo, updatePassword} from "../../api/profileApi";
import {logout} from "../../api/authApi.ts";
import mainCss from "../../assets/css/Main.module.css";
import profileCss from "../../assets/css/profile/Profile.module.css";

export default function ProfilePage() {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
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
        await updateProfileInfo(nickname);
        setProfileInfoMessage("Profile updated");
    }

    async function updPass(e: React.FormEvent) {
        e.preventDefault();

        await updatePassword(currentPassword, newPassword);

        setCurrentPassword("");
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
                <div className={profileCss.inputEmail}>
                    <label>Email: </label>
                    <input placeholder="Email" disabled value={email}
                           onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className={profileCss.inputNickname}>
                    <label>Nickname: </label>
                    <input placeholder="Enter your nickname" value={nickname}
                           onChange={e => setNickname(e.target.value)}/>
                </div>

                <div className={profileCss.saveProfileInfoBtn}>
                    <button type="submit">Save profile info</button>
                    {profileInfoMessage && <p className={mainCss.successMessage}>{profileInfoMessage}</p>}
                </div>
            </form>

            <form className={profileCss.form} onSubmit={updPass}>
                <div className={profileCss.inputCurrentPassword}>
                    <label>Current password: </label>
                    <input type="password" placeholder="Enter current password" value={currentPassword}
                           onChange={e => setCurrentPassword(e.target.value)}/>
                </div>

                <div className={profileCss.inputNewPassword}>
                    <label>New password: </label>
                    <input type="password" placeholder="Enter new password" value={newPassword}
                           onChange={e => setNewPassword(e.target.value)}/>
                </div>

                <div className={profileCss.savePasswordBtn}>
                    <button type="submit">Save password</button>
                    {passwordMessage && <p className={mainCss.successMessage}>{passwordMessage}</p>}
                </div>
            </form>
        </div>
    );
}