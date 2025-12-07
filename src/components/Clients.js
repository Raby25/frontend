import React, { useEffect, useState } from 'react';

const API_CLIENTS = 'http://localhost:8080/clients';

const Clients = ({ token }) => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', tel: '' });

  const fetchClients = async () => {
    const res = await fetch(API_CLIENTS, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async () => {
    await fetch(API_CLIENTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(form)
    });
    setForm({ nom: '', prenom: '', email: '', tel: '' });
    fetchClients();
  };

  return (
    <div>
      <h2>Clients</h2>
      <input placeholder="Nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
      <input placeholder="Prenom" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Tel" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} />
      <button onClick={handleAddClient}>Ajouter Client</button>

      <ul>
        {clients.map(c => (
          <li key={c.id}>{c.nom} {c.prenom} ({c.email}) - {c.tel}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
