import React from "react";
import "./ProductCards.css";

const products = [
  {
    id: 1,
    name: "Ξηρά Τροφή Σκύλου",
    price: "15.90€",
    image: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg",
  },
  {
    id: 2,
    name: "Τροφή Γάτας",
    price: "12.50€",
    image: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg",
  },
  {
    id: 3,
    name: "Παιχνίδι για Πτηνά",
    price: "8.90€",
    image: "https://cdn.pixabay.com/photo/2024/02/16/19/22/green-parrot-8578205_1280.jpg",
  },
];

const ProductCards = () => {
  return (
    <div className="product-section">
      <h2 className="product-title">Προτεινόμενα Προϊόντα</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
            <button className="buy-button">Αγορά</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
