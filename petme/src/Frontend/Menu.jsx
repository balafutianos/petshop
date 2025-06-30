import React, { useState, useEffect, useRef } from "react";
import "./Menu.css";
import Hypernav from "../Frontend/Hypernav";

const Menu = () => {
  const [menuActive, setMenuActive] = useState(false);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuActive(false);
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
    { label: "Αρχική", isHome: true },
    { label: "Σχετικά", isHome: false },
    { label: "Υπηρεσίες", isHome: false },
    { label: "Έργα", isHome: false },
    { label: "Επικοινωνία", isHome: false },
  ];

  return (
    
  <>
    <Hypernav />

    <header className="navbar">
      <div className="logo">
        <a href="#">PetME</a>
      </div>

      <nav className={`nav-menu ${menuActive ? "active" : ""}`} id="nav-menu">
        <ul className="nav-links">
          {greekMenuItems.map((item, idx) => (
            <li key={idx}>
              <a
                href="#"
                onClick={handleLinkClick}
                className={item.isHome ? "active" : ""}
                aria-current={item.isHome ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

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
    </header>
  </>
);
};

export default Menu;
