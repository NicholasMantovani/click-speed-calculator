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
    <div className="flex justify-center flex-col items-center">
      {user.id !== undefined ?
        <div> Buongiorno {user.name} {user.surname}
          <SpeedClick username={user.id} /></div>
        : <Login onAddUser={handleUserAdd} />
      }
    </div>
  );
}

export default App;
