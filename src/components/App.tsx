import { useState } from 'react';
import { addUserToDatabase } from '../services/ApiServices';
import { User } from '../types/types';
import SpeedClick from './SpeedClick';
import Login from './Login';


function App() {

  const [user, setLoggedUser] = useState<User>({} as User)


  async function handleUserAdd(user: User) {
    setLoggedUser(await addUserToDatabase(user))
  }


  return (
    <div className="flex justify-center flex-col items-center text-center">
      {<div p-5 text-center>
          <h1 className="text-2xl p-2"> Ciao {user.name} {user.surname} </h1>
          <SpeedClick username="Cippa" />
        </div>
      }
    </div>
  );
}

export default App;
