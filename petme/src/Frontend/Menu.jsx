import React, { useState, useEffect, useRef } from "react";
import { href, Link } from "react-router-dom"; // <-- add this
import "./Menu.css";
import Hypernav from "../Frontend/Hypernav";
import Slideshow from "./Slideshow";
import Products from "./Products";
import Footer from "./Footer";

const Menu = () => {
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
        { label: "Αξεσουάρ", href: "/dogs/dogaccessories" },
      ],
    },
    {
      label: "Γάτες",
      isHome: false,
      submenu: [
        { label: "Τροφές", href: "/cats/food" }, // must match your Route
        { label: "Παιχνίδια", href: "/cats/cataccessories" },
      ],
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
    <>
      <Hypernav />

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
                  {/* Parent label (desktop hover; mobile toggles dropdown) */}
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
                    className={item.isHome ? "active" : ""}
                    aria-haspopup={hasSubmenu ? "true" : undefined}
                    aria-expanded={isOpen ? "true" : "false"}
                    tabIndex="0"
                  >
                    {item.label}
                  </a>

                  {/* Submenu */}
                  {hasSubmenu && (
                    <ul className="dropdown">
                      {item.submenu.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          {subItem.href.startsWith("/") ? (
                            <Link to={subItem.href} onClick={handleLinkClick}>
                              {subItem.label}
                            </Link>
                          ) : (
                            <a href={subItem.href} onClick={handleLinkClick}>
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

      <Slideshow />
      <Products />
      <Footer />
    </>
  );
};

export default Menu;
