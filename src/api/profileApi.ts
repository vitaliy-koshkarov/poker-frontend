import { authFetch } from "./authFetch";

const URL = "http://localhost:8080/api/profile";

export async function getProfileInfo() {
	const response = await authFetch(`${URL}/getProfileInfo`);

	if (!response.ok) {
		throw new Error("Error get profile info");
	}

	return response.json();
}

export async function updateProfileInfo(email: string, nickname: string) {
	const response = await authFetch(`${URL}/updateProfileInfo`, {
		method: "POST",
		body: JSON.stringify({email, nickname})
	});

	if (!response.ok) {
		throw new Error("Error update profile info");
	}

	const responseData = await response.json();
	return responseData;
}

export async function updatePassword() {

}