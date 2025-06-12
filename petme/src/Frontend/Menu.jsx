import React, { useState, useEffect, useRef } from "react";
import "./Menu.css";

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

  return (
    <header className="navbar">
      <div className="logo">
        <a href="#">PetME</a>
      </div>

      <nav className={`nav-menu ${menuActive ? "active" : ""}`} id="nav-menu">
        <ul className="nav-links">
          {["Home", "About", "Services", "Projects", "Contact"].map((item, idx) => (
            <li key={idx}>
              <a
                href="#"
                onClick={handleLinkClick}
                className={item === "Home" ? "active" : ""}
                aria-current={item === "Home" ? "page" : undefined}
              >
                {item}
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
  );
};

export default Menu;
