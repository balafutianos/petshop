// src/Frontend/Favorites.jsx
import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("favorites");
    try {
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);

  return (
    <main style={{ maxWidth: 960, margin: "120px auto 40px", padding: "0 16px" }}>
      <h1>Αγαπημένα</h1>
      {items.length === 0 ? (
        <p>Δεν έχεις προσθέσει αγαπημένα ακόμη.</p>
      ) : (
        <ul style={{ display: "grid", gap: 12, listStyle: "none", paddingLeft: 0 }}>
          {items.map((it, i) => (
            <li key={i} style={{ background: "#fff", borderRadius: 10, padding: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {it.imageUrl && <img src={it.imageUrl} alt={it.title} width={72} height={72} style={{ objectFit: "cover", borderRadius: 8 }} />}
                <div style={{ flex: 1 }}>
                  <strong>{it.title}</strong>
                  <div style={{ opacity: .8 }}>{it.brand}</div>
                </div>
                <div><strong>€{Number(it.price ?? 0).toFixed(2)}</strong></div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Favorites;
