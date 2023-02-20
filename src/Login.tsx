import { useState } from "react";

interface UserFormProps {
    onAddUser?: Function;
}

export interface User {
    id: number,
    name: string,
    surname: string,
}

export default function Login(props: UserFormProps) {
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");


    function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log('Nome', nome)
        console.log('Cognome', cognome)

        const user = { name: nome, surname: cognome } as User
        if (props.onAddUser) { props.onAddUser(user) }
    }

    return (
        <div className="login">
            Login:
            <form onSubmit={event => handleLoginSubmit(event)}>
                <div className="input">
                    <label>Nome: </label>
                    <input type="text" onChange={event => setNome(event.target.value)}></input>
                </div>
                <div className="input">
                    <label>Cognome: </label>
                    <input type="text" onChange={event => setCognome(event.target.value)}></input>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}