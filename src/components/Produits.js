// Produits.js
import React, { useEffect, useState } from 'react';

const API_PRODUITS = 'http://localhost:8081/produits';

const Produits = ({ token }) => {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const fetchProduits = async () => {
            const res = await fetch(API_PRODUITS, {
                headers: { Authorization: 'Bearer ' + token }
            });
            const data = await res.json();
            setProduits(data);
        };
        fetchProduits();
    }, [token]);

    const handleAddProduit = async () => {
        const nom = prompt("Nom du produit ?");
        const prix = prompt("Prix ?");
        const stock = prompt("Stock ?");

        const res = await fetch(API_PRODUITS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ nom, prix, stock })
        });

        const newProduit = await res.json();
        setProduits([...produits, newProduit]);
    };

    return (
        <div>
            <h2>Produits</h2>
            <button onClick={handleAddProduit}>Ajouter un produit</button>
            <ul>
                {produits.map(p => (
                    <li key={p.id}>{p.nom} - {p.prix}€ (Stock : {p.stock})</li>
                ))}
            </ul>
        </div>
    );
};

export default Produits;
