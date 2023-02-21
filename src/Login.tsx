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
        <div className="p-5 text-center">
            <h1 className="text-xl">Esegui l'accesso</h1>
            <form onSubmit={event => handleLoginSubmit(event)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Nome</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={event => setNome(event.target.value)}></input>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Cognome</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={event => setCognome(event.target.value)}></input>
                </div>
                <div className="p-5">
                    <button type="submit" className="btn">Login</button>
                </div>
            </form>
        </div>
    )
}