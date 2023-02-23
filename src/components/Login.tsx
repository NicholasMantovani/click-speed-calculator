import { useState } from "react";
import { LoginProps, User } from "../types/types";

export const originLocation = window.location.origin

export default function Login(props: LoginProps) {
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");


    function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const user: User = { name: nome, surname: cognome }
        if (props.onAddUser) { props.onAddUser(user) }
    }

    return (
        <div className="p-5 text-center">
            <h1 className="text-2xl">Esegui l'accesso</h1>
            <form onSubmit={event => handleLoginSubmit(event)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Nome</span>
                    </label>
                    <input type="text" placeholder="Mario" className="input input-bordered w-full max-w-xs" onChange={event => setNome(event.target.value)}></input>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Cognome</span>
                    </label>
                    <input type="text" placeholder="Rossi" className="input input-bordered w-full max-w-xs" onChange={event => setCognome(event.target.value)}></input>
                </div>
                <div className="p-5">
                    <button type="submit" className="btn btn-primary">Accesso</button>
                </div>
            </form>
        </div>
    )
}