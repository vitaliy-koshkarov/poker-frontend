import { authFetch } from "./authFetch";

const URL = "http://localhost:8080/api/profile";

export async function getProfileInfo() {
	const getProfileInfoResponse = await authFetch(`${URL}/getProfileInfo`);

	if (!getProfileInfoResponse.ok) {
		throw new Error("Error get profile info");
	}

	return getProfileInfoResponse.json();
}

export async function updateProfileInfo(email: string, nickname: string) {
	const updateProfileInfoResponse = await authFetch(`${URL}/updateProfileInfo`, {
		method: "POST",
		body: JSON.stringify({email, nickname})
	});

	if (!updateProfileInfoResponse.ok) {
		throw new Error("Error update profile info");
	}
}

export async function updatePassword(oldPassword: string, newPassword: string) {
	const updatePasswordResponse = await authFetch(`${URL}/updatePassword`, {
		method: "POST",
		body: JSON.stringify({oldPassword, newPassword})
	});

	if (!updatePasswordResponse.ok) {
		throw new Error("Error update password");
	}
}