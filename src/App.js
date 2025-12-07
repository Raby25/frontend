// App.js
import React, { useState } from 'react';
import Login from './components/Login';
//import Clients from './components/Clients';
import Commandes from './components/Commandes';

function App() {
  const [token, setToken] = useState("");

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => setToken("")}>
        Se déconnecter
      </button>

      <Commandes token={token} />

    </div>
  );
}

export default App;
