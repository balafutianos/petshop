import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // προσαρμόζεις το path
import "./CatFood.css";
import Footer from "./Footer";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
    if (menuActive) setOpenDropdownIndex(null);
  };

  const toggleDropdown = (idx) => {
    setOpenDropdownIndex((prev) => (prev === idx ? null : idx));
  };

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
    if (hamburgerRef.current) {
      hamburgerRef.current.setAttribute("aria-expanded", menuActive);
    }
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
                  if (window.innerWidth <= 768 && hasSubmenu) {
                    toggleDropdown(idx);
                  }
                }}
              >
                {/* Αν είναι Αρχική, κάνε Link προς "/" (Menu.jsx) */}
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
                  // Διαφορετικά, διατηρούμε την προηγούμενη συμπεριφορά με το dropdown
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

const DogAccessories = () => {
  const [dogproducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadProducts = async () => {
    try {
      
      const qNoOrder = query(
        collection(db, "dogaccessories"),
        where("category", "==", "dogts"),
        where("active", "==", true)
      );

      let snap = await getDocs(qNoOrder);
      let rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      console.log("DOG-FOOD (no order):", rows);

      
      const allHaveCreatedAt = rows.length > 0 && rows.every(r => !!r.createdAt);
      if (allHaveCreatedAt) {
        try {
          const qWithOrder = query(
            collection(db, "dogaccessories"),
            where("category", "==", "dogts"),
            where("active", "==", true),
            orderBy("createdAt", "desc")
          );
          snap = await getDocs(qWithOrder);
          rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          console.log("DOG-FOOD (with order):", rows);
        } catch (orderErr) {
          // Αν ζητά index, link στην κονσόλα για debug.g
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

      <main id="cat-food" style={{ paddingTop: 140, maxWidth: 1200, margin: "0 auto", paddingLeft: 16, paddingRight: 16 }}>
        <nav className="breadcrumbs" aria-label="Θέση στη σελίδα" style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <Link to="/">Αρχική</Link>
          <span aria-hidden="true">›</span>
          <span>Σκύλος</span>
          <span aria-hidden="true">›</span>
          <span aria-current="page">Παιχνίδια και Αξεσουάρ</span>
        </nav>

        <section
          className="dog-hero"
          role="img"
          aria-label="Τροφές γάτας"
          style={{
            background:
             "linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat",
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
            <h1>Παιχνίδια και Αξεσουάρ για Σκύλους</h1>
            <p style={{ opacity: 0.95, marginTop: 6 }}>
              Ποικιλία παιχνιδιών και αξεσουάρ για τους χνουδουτούς μας φίλους.
            </p>
          </div>
        </section>

        {loading ? (
          <p>Φόρτωση…</p>
        ) : dogproducts.length === 0 ? (
          <p>Δεν υπάρχουν προϊόντα.</p>
        ) : (
          <ul className="product-grid">
            {dogproducts.map((p) => (
            <li key={p.id} className="product-card">
  <a className="card-link" href={`#/product/${p.id}`}>
    <img src={p.imageUrl} alt={p.title} loading="lazy" />
    <div className="card-body">
      <h3 className="title">{p.title}</h3>
      <p className="meta">
        <span>{p.brand}</span> · <span>{p.lifeStage}</span> · <span>{p.type}</span>
      </p>

      {/* --- STOCK BADGE --- */}
      {(() => {
        const stock = Number(p.stock ?? 0);
        const stockClass = stock <= 0 ? "stock-out" : stock <= 5 ? "stock-low" : "stock-in";
        const stockLabel =
          stock <= 0 ? "Εξαντλημένο" : stock <= 5 ? `Λίγα τεμάχια (${stock})` : `Σε απόθεμα (${stock})`;
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

export default DogAccessories;
