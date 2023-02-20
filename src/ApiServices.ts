import { User } from "./Login";

export default function addUserToDatabase(user: User) {
    const output = fetch("http://localhost:3002/api/add-user", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .then(
            (result) => {
                return true;
            },
            (error) => {
                window.alert("An error occurs during insert the users");
                return false;
            }
        );
    return output;
}