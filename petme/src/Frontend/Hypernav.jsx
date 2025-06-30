import React from "react";
import "./Hypernav.css";

const Hypernav = () => {
  return (
    <div className="top-info-bar">
      <div className="left">ΤΗΛΕΦΩΝΙΚΕΣ ΠΑΡΑΓΓΕΛΙΕΣ: 231 405 5596</div>
      <div className="center">ΚΛΕΑΝΘΟΥΣ 41, ΚΑΤΩ ΤΟΥΜΠΑ</div>
      <div className="right">
        <a
          href="https://www.facebook.com/petshoppetme/" // Replace with actual page
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
      </div>
    </div>
  );
};

export default Hypernav;
