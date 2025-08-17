// src/Frontend/ProductCards.jsx
import React, { useEffect, useState } from "react";
import "./ProductCards.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Τα έγγραφα που ζήτησες
const TARGETS = [
  { col: "birdcages", id: "BIRDCG3" },
  { col: "products", id: "CAT6PRD" },
  { col: "dogaccessories", id: "DOGTS1" },
  { col: "cataccessories", id: "CATTS8" },
];

const PLACEHOLDER_IMG =
  "https://cdn.pixabay.com/photo/2016/11/29/12/54/paw-1861987_1280.png"; // fallback αν λείπει εικόνα

function normalizeProduct(snap, col) {
  const d = snap.data() || {};
  const name = d.title || d.name || d.productName || `${col} ${snap.id}`;
  // price μπορεί να είναι number ή string
  const priceNum = typeof d.price === "number" ? d.price : Number(d.price);
  const priceLabel = Number.isFinite(priceNum) ? `€${priceNum.toFixed(2)}` : (d.price || "—");
  const image = d.imageUrl || d.image || d.photoUrl || PLACEHOLDER_IMG;

  return {
    key: `${col}-${snap.id}`,
    name,
    priceLabel,
    image,
  };
}

const ProductCards = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const results = await Promise.all(
          TARGETS.map(async ({ col, id }) => {
            const ref = doc(db, col, id);
            const snap = await getDoc(ref);
            return snap.exists() ? normalizeProduct(snap, col) : null;
          })
        );
        setItems(results.filter(Boolean));
      } catch (e) {
        console.error("ProductCards Firestore error:", e);
        setErr("Αποτυχία φόρτωσης προϊόντων.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="product-section">
        <h2 className="product-title">Προτεινόμενα Προϊόντα</h2>
        <p>Φόρτωση…</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="product-section">
        <h2 className="product-title">Προτεινόμενα Προϊόντα</h2>
        <p>{err}</p>
      </div>
    );
  }

  return (
    <div className="product-section">
      <h2 className="product-title">Προτεινόμενα Προϊόντα</h2>
      <div className="product-grid">
        {items.map((product) => (
          <div className="product-card" key={product.key}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="price">{product.priceLabel}</p>
            <button className="buy-button">Αγορά</button>
          </div>
        ))}
      </div>

      {items.length < TARGETS.length && (
        <p style={{ marginTop: 8, opacity: 0.8 }}>
          * Κάποια προϊόντα δεν βρέθηκαν ή δεν επιτρέπεται η πρόσβαση.
        </p>
      )}
    </div>
  );
};

export default ProductCards;
