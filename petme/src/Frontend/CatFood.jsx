// src/Frontend/CatFood.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./CatFood.css";
import Footer from "./Footer";
import useFavoritesBucket from "./useFavoritesBucket";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
    if (menuActive) setOpenDropdownIndex(null);
  };
  const toggleDropdown = (idx) => setOpenDropdownIndex((prev) => (prev === idx ? null : idx));
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuActive(false);
      setOpenDropdownIndex(null);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  };

  useEffect(() => {
    if (hamburgerRef.current) hamburgerRef.current.setAttribute("aria-expanded", menuActive);
  }, [menuActive]);

  const greekMenuItems = [
    { label: "Αρχική", isHome: true, submenu: [] },
    {
      label: "Σκυλιά",
      isHome: false,
      submenu: [
        { label: "Τροφές", href: "/dogs/food" },
        { label: "Αξεσουάρ/Παιχνίδια", href: "/dogs/dogaccessories" },
      ],
    },
    {
      label: "Γάτες",
      isHome: false,
      submenu: [
        { label: "Τροφές", href: "/cats/food", active: true },
        { label: "Αξεσουάρ/Παιχνίδια", href: "/cats/cataccessories" },
      ],
      activeParent: true,
    },
    {
      label: "Πτηνά",
      isHome: false,
      submenu: [
        { label: "Κλουβιά", href: "/birds/cages" },
        { label: "Τροφές", href: "/birds/food" },
      ],
    },
  ];

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">PetME</Link>
      </div>

      <nav className={`nav-menu ${menuActive ? "active" : ""}`} id="nav-menu">
        <ul className="nav-links">
          {greekMenuItems.map((item, idx) => {
            const hasSubmenu = item.submenu.length > 0;
            const isOpen = openDropdownIndex === idx;

            return (
              <li
                key={idx}
                className={`has-dropdown ${isOpen ? "open" : ""} ${item.isHome ? "no-arrow" : ""}`}
                onClick={() => {
                  if (window.innerWidth <= 768 && hasSubmenu) toggleDropdown(idx);
                }}
              >
                {item.isHome ? (
                  <Link
                    to="/"
                    onClick={handleLinkClick}
                    className={item.activeParent || item.isHome ? "active" : ""}
                    aria-current="page"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => {
                      if (window.innerWidth <= 768 && hasSubmenu) {
                        e.preventDefault();
                        toggleDropdown(idx);
                      } else {
                        handleLinkClick();
                      }
                    }}
                    className={item.activeParent ? "active" : ""}
                    aria-haspopup={hasSubmenu ? "true" : undefined}
                    aria-expanded={isOpen ? "true" : "false"}
                    tabIndex="0"
                  >
                    {item.label}
                  </a>
                )}

                {hasSubmenu && (
                  <ul className="dropdown">
                    {item.submenu.map((subItem, subIdx) => (
                      <li key={subIdx}>
                        {subItem.href.startsWith("/") ? (
                          <Link
                            to={subItem.href}
                            onClick={handleLinkClick}
                            className={subItem.active ? "active" : ""}
                            aria-current={subItem.active ? "page" : undefined}
                          >
                            {subItem.label}
                          </Link>
                        ) : (
                          <a
                            href={subItem.href}
                            onClick={handleLinkClick}
                            className={subItem.active ? "active" : ""}
                            aria-current={subItem.active ? "page" : undefined}
                          >
                            {subItem.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="nav-center-right">
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Αναζήτηση..." aria-label="Search" />
          <button type="submit" aria-label="Search button">🔍</button>
        </form>

        <div
          className={`hamburger ${menuActive ? "active" : ""}`}
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          ref={hamburgerRef}
          role="button"
          tabIndex="0"
          aria-label="Toggle navigation menu"
          aria-controls="nav-menu"
          aria-expanded={menuActive}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </header>
  );
};

const CatFood = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToBucket, toggleFavorite, isFavorite } = useFavoritesBucket();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const qNoOrder = query(
          collection(db, "products"),
          where("category", "==", "cat-food"),
          where("active", "==", true)
        );

        let snap = await getDocs(qNoOrder);
        let rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const allHaveCreatedAt = rows.length > 0 && rows.every((r) => !!r.createdAt);
        if (allHaveCreatedAt) {
          try {
            const qWithOrder = query(
              collection(db, "products"),
              where("category", "==", "cat-food"),
              where("active", "==", true),
              orderBy("createdAt", "desc")
            );
            snap = await getDocs(qWithOrder);
            rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          } catch (orderErr) {
            console.warn("orderBy failed, using no-order results. Details:", orderErr);
          }
        }

        setProducts(rows);
      } catch (err) {
        console.error("Firestore error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <>
      <Navbar />

      <main
        id="cat-food"
        style={{ paddingTop: 140, maxWidth: 1200, margin: "0 auto", paddingLeft: 16, paddingRight: 16 }}
      >
        <nav className="breadcrumbs" aria-label="Θέση στη σελίδα" style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <Link to="/">Αρχική</Link>
          <span aria-hidden="true">›</span>
          <span>Γάτες</span>
          <span aria-hidden="true">›</span>
          <span aria-current="page">Τροφές</span>
        </nav>

        <section
          className="cat-hero"
          role="img"
          aria-label="Τροφές γάτας"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1600&auto=format&fit=crop') center/cover no-repeat",
            height: 220,
            borderRadius: 14,
            display: "grid",
            placeItems: "center",
            marginBottom: 24,
            color: "#fff",
            textAlign: "center",
          }}
        >
          <div>
            <h1>Τροφές Γάτας</h1>
            <p style={{ opacity: 0.95, marginTop: 6 }}>
              Ξηρά, υγρή και ειδικές συνταγές — ενημερώνονται αυτόματα από Firebase.
            </p>
          </div>
        </section>

        {loading ? (
          <p>Φόρτωση…</p>
        ) : products.length === 0 ? (
          <p>Δεν υπάρχουν προϊόντα.</p>
        ) : (
          <ul className="product-grid">
            {products.map((p) => (
              <li key={p.id} className="product-card">
                <a className="card-link" href={`#/product/${p.id}`}>
                  {/* media + overlay actions */}
                  <div className="card-media">
                    <img src={p.imageUrl} alt={p.title} loading="lazy" />

                    <div className="card-actions">
                      <button
                        type="button"
                        className={`icon-btn heart ${isFavorite(p.id) ? "active" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite({
                            id: p.id,
                            title: p.title,
                            brand: p.brand,
                            price: p.price,
                            imageUrl: p.imageUrl,
                          });
                        }}
                        aria-label={isFavorite(p.id) ? "Αφαίρεση από αγαπημένα" : "Προσθήκη στα αγαπημένα"}
                        title={isFavorite(p.id) ? "Αφαίρεση από αγαπημένα" : "Προσθήκη στα αγαπημένα"}
                      >
                        ♥
                      </button>

                      <button
                        type="button"
                        className="icon-btn cart"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToBucket({
                            id: p.id,
                            title: p.title,
                            brand: p.brand,
                            price: p.price,
                            imageUrl: p.imageUrl,
                          });
                        }}
                        aria-label="Προσθήκη στο καλάθι"
                        title="Προσθήκη στο καλάθι"
                      >
                        🛒
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <h3 className="title">{p.title}</h3>
                    {(p.brand || p.lifeStage || p.type) && (
                      <p className="meta">
                        {p.brand && <span>{p.brand}</span>}
                        {p.brand && (p.lifeStage || p.type) ? " · " : ""}
                        {p.lifeStage && <span>{p.lifeStage}</span>}
                        {p.lifeStage && p.type ? " · " : ""}
                        {p.type && <span>{p.type}</span>}
                      </p>
                    )}

                    {/* Stock badge */}
                    {(() => {
                      const stock = Number(p.stock ?? 0);
                      const stockClass = stock <= 0 ? "stock-out" : stock <= 5 ? "stock-low" : "stock-in";
                      const stockLabel = stock <= 0 ? "Εξαντλημένο" : stock <= 5 ? `Λίγα τεμάχια (${stock})` : `Σε απόθεμα (${stock})`;
                      return <span className={`stock-badge ${stockClass}`}>{stockLabel}</span>;
                    })()}

                    <div className="price-row" style={{ marginTop: 8 }}>
                      <span className="price">€{Number(p.price).toFixed(2)}</span>
                      {p.rating && <span className="rating">★ {p.rating}</span>}
                    </div>

                    {(() => {
                      const stock = Number(p.stock ?? 0);
                      const disabled = stock <= 0;
                      return (
                        <button
                          className={`btn-primary ${disabled ? "btn-disabled" : ""}`}
                          type="button"
                          disabled={disabled}
                          aria-disabled={disabled}
                          title={disabled ? "Μη διαθέσιμο προς το παρόν" : "Προσθήκη στο καλάθι"}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!disabled) {
                              addToBucket({
                                id: p.id,
                                title: p.title,
                                brand: p.brand,
                                price: p.price,
                                imageUrl: p.imageUrl,
                              });
                            }
                          }}
                        >
                          {disabled ? "Εξαντλημένο" : "Προσθήκη στο καλάθι"}
                        </button>
                      );
                    })()}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </>
  );
};

export default CatFood;
