import React from "react";
import "./Hypernav.css";

const Hypernav = () => {
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
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
            alt="Facebook"
            className="facebook-icon"
          />
          Facebook
        </a>

        <a href="#" className="account-link" aria-label="Ο λογαριασμός μου">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="account-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="#333"
          >
            <path d="M12 2a5 5 0 110 10 5 5 0 010-10zm0 12c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
          </svg>
          Ο λογαριασμός μου
        </a>
      </div>
    </div>
  );
};

export default Hypernav;
