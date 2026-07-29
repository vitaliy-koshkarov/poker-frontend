import {authFetch} from "./authFetch";

const URL = "http://localhost:8080/api/profile";

export async function getProfileInfo() {
    const getProfileInfoResponse = await authFetch(`${URL}/getProfileInfo`);

    if (!getProfileInfoResponse.ok) {
        throw new Error(await getProfileInfoResponse.text());
    }

    return getProfileInfoResponse.json();
}

export async function updateProfileInfo(nickname: string) {
    const updateProfileInfoResponse = await authFetch(`${URL}/updateProfileInfo`, {
        method: "POST",
        body: JSON.stringify({nickname})
    });

    if (!updateProfileInfoResponse.ok) {
        throw new Error(await updateProfileInfoResponse.text());
    }

    return updateProfileInfoResponse.text();
}

export async function updatePassword(currentPassword: string, newPassword: string) {
    const updatePasswordResponse = await authFetch(`${URL}/updatePassword`, {
        method: "POST",
        body: JSON.stringify({currentPassword, newPassword})
    });

    if (!updatePasswordResponse.ok) {
        throw new Error("Error update password");
    }
}