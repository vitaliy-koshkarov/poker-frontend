import type { authFetch } from "./authFetch";

const BASE_URL = "http://localhost:8080/api";

export async function fetchTables() {
    const response = await authFetch(`${BASE_URL}/tables`);

    if (!response.ok) {
        throw new Error("Failed to fetch tables");
    }

    return response.json();
}

// export async function fetchTables() : Promise<Table[]> {
//     const token = localStorage.getItem("token");

//     const tables = await fetch(`${BASE_URL}/tables`, {
//         headers: {
//             Authoziration: `Bearer ${token}`,
//         },
//     });

//     // console.log("tables:" + JSON.parse(tables));

//     if (!tables.ok) {
//   	    throw new Error("Failed to fetch tables");
//     }

//     console.log("RAW RESPONSE:", tables);

//     return tables.json();
// }