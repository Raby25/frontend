import React, { useEffect, useState } from "react";

const API_COMMANDES = "http://localhost:8082/commandes";

const Commandes = ({ token, onLogout }) => {
    const [commandes, setCommandes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const res = await fetch(API_COMMANDES, {
                    headers: { Authorization: "Bearer " + token },
                });
                if (!res.ok) throw new Error(`Erreur fetch commandes : ${res.status}`);
                const data = await res.json();
                setCommandes(data);
            } catch (err) {
                console.error(err);
                setError("Impossible de récupérer les commandes.");
            }
        };
        fetchCommandes();
    }, [token]);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Commandes</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table
                style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
            >
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Numéro</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Client</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Statut</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Montant Total</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Lignes</th>
                    </tr>
                </thead>
                <tbody>
                    {commandes.map((c, index) => (
                        <tr key={c.numCommande}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{c.numCommande}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{c.idClient}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{c.statut}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{c.montantTotal} €</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                                    {c.lignes.map((l, idx) => (
                                        <li key={idx}>
                                            {l.libelleProduit} – Qte: {l.quantite} – Prix: {l.prixUnitaire} €
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Commandes;
