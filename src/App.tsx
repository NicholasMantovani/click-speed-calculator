import React, { useState } from 'react';
import addUserToDatabase from './ApiServices';
import handleUserAdd from './ApiServices';
import './App.css';
import FastClicking from './Fastclicking';
import Login, { User } from './Login';


function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [user, setLoggedUser] = useState<User>({ name: 'nicholas', surname: 'mantovani' } as User)


  async function handleUserAdd(user: User) {
    setLoggedUser(user)
    setIsLogged(await addUserToDatabase(user))
  }


  return (
    <div className="flex justify-center flex-col items-center">
      {isLogged && user ?
        <div> L'utente loggato si chiama {user.name} {user.surname} <FastClicking /></div>

        : <Login onAddUser={handleUserAdd} />
      }
    </div>
  );
}

export default App;
