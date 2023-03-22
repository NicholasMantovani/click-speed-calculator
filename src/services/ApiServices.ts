import { originLocation } from "../components/Login";
import { User } from "../types/types";

export function addUserToDatabase(user: User) {

    const output = fetch(originLocation + "/clicks/user", {
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
