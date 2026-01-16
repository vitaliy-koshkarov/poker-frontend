import type { Table } from "../model/Table";

const BASE_URL = "http://localhost:8080/api";

export async function fetchTables() : Promise<Table[]> {
    const tables = await fetch(`${BASE_URL}/tables`);

    if (!tables.ok) {
  	    throw new Error("Failed to fetch tables");
    }

    console.log("RAW RESPONSE:", tables);

    return tables.json();
}