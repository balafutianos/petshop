// src/Frontend/Hypernav.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "./Hypernav.css";

const Hypernav = () => {
  const { user, signOut } = useAuth();
  const displayName =
    user?.displayName || (user?.email ? user.email.split("@")[0] : "");

  return (
    <div className="top-info-bar">
      <div className="left">ΤΗΛΕΦΩΝΙΚΕΣ ΠΑΡΑΓΓΕΛΙΕΣ: 231 405 5596</div>
      <div className="center">ΚΛΕΑΝΘΟΥΣ 41, ΚΑΤΩ ΤΟΥΜΠΑ</div>

      <div className="right">
        <a
          href="https://www.facebook.com/petshoppetme/"
          target="_blank"
          rel="noopener noreferrer"
          className="facebook-link"
        >
          <span className="facebook-icon" aria-hidden="true" />
          Facebook
        </a>

        {/* Account with dropdown */}
        <div className="account-menu" tabIndex={0}>
          <button type="button" className="account-link" aria-haspopup="true" aria-expanded="false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="account-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a5 5 0 110 10 5 5 0 010-10zm0 12c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
            </svg>
            {user ? <>Γεια σου,&nbsp;<strong>{displayName}</strong></> : "Ο λογαριασμός μου"}
          </button>

          {/* Αν δεν είναι συνδεδεμένος: Σύνδεση / Εγγραφή */}
          {!user && (
            <ul className="account-dropdown" role="menu">
              <li role="none"><Link to="/signin" role="menuitem">Σύνδεση</Link></li>
              <li role="none"><Link to="/signup" role="menuitem">Εγγραφή</Link></li>
            </ul>
          )}

          {/* Αν είναι συνδεδεμένος: Καλάθι / Αγαπημένα / Αποσύνδεση */}
          {user && (
            <ul className="account-dropdown" role="menu">
              <li role="none"><Link to="/bucket" role="menuitem">Καλάθι</Link></li>
              <li role="none"><Link to="/favorites" role="menuitem">Αγαπημένα</Link></li>
              <li role="none">
                <button type="button" className="dropdown-button" onClick={signOut}>
                  Αποσύνδεση
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hypernav;
