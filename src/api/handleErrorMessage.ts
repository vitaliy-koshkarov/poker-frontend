import {useState} from "react";

export function handleErrorMessage() {
    const [errorMessage, setErrorMessage] = useState("");

    function showErrorMessage(error: unknown) {
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage("Unexpected error");
        }
    }

    function clearErrorMessage() {
        setErrorMessage("");
    }

    return {errorMessage, showErrorMessage, clearErrorMessage};
}