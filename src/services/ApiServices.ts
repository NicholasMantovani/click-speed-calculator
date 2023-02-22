import { TimesInput, User } from "../types/types";

export function addUserToDatabase(user: User) {
    const output = fetch("http://localhost:8080/clicks/user", {
        headers: new Headers({ 'content-type': 'application/json' }),
        method: "POST",
        body: JSON.stringify(user),
        mode: "cors"
    })
        .then((res) => res.json())
        .then(
            (result: User) => {
                return result;
            },
            (error) => {
                window.alert("Errore durante l'inserimento degli utenti");
                return {} as User;
            }
        );
    return output;
}

export function addClicksToDatabase(timeInput: TimesInput) {
    fetch("http://localhost:8080/clicks", {
        headers: new Headers({ 'content-type': 'application/json' }),
        method: "POST",
        body: JSON.stringify(timeInput),
        mode: "cors"
    })
}