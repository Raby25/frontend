// Login.js
import React, { useState } from 'react';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:8083/realms/paye-ton-kawa/protocol/openid-connect/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "password",
            client_id: "api-commandes",
            client_secret: "0KTNH6YsSC3FMfNPorYOd301iI8LXWUH",
            username,
            password
          })
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Erreur login:", text);
        alert("Erreur de connexion !");
        return;
      }

      const data = await response.json();
      setToken(data.access_token);
      console.log("Token obtenu:", data.access_token);

    } catch (err) {
      console.error(err);
      alert("Impossible de se connecter !");
    }
  };

  return (
    <div>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default Login;
