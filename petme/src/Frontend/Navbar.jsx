const Navbar = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(null);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const toggleDropdown = (category) => {
    setDropdownOpen(dropdownOpen === category ? null : category);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Logo />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/blogs">Blogs</NavLink></li>
            <li><NavLink to="/projects">Projects</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>

            {/* Γάτα Dropdown */}
            <li className="dropdown" onMouseEnter={() => toggleDropdown("cat")} onMouseLeave={() => toggleDropdown(null)}>
              <span className="dropdown-title">Γάτα</span>
              {dropdownOpen === "cat" && (
                <ul className="dropdown-menu">
                  <li><NavLink to="/cat/food">Τροφές</NavLink></li>
                  <li><NavLink to="/cat/accessories">Αξεσουάρ</NavLink></li>
                  <li><NavLink to="/cat/housing">Διαμονή και Μεταφορά</NavLink></li>
                </ul>
              )}
            </li>

            {/* Σκύλος Dropdown */}
            <li className="dropdown" onMouseEnter={() => toggleDropdown("dog")} onMouseLeave={() => toggleDropdown(null)}>
              <span className="dropdown-title">Σκύλος</span>
              {dropdownOpen === "dog" && (
                <ul className="dropdown-menu">
                  <li><NavLink to="/dog/food">Τροφές</NavLink></li>
                  <li><NavLink to="/dog/accessories">Αξεσουάρ</NavLink></li>
                  <li><NavLink to="/dog/housing">Διαμονή και Μεταφορά</NavLink></li>
                </ul>
              )}
            </li>

            {/* Πτηνά Dropdown */}
            <li className="dropdown" onMouseEnter={() => toggleDropdown("birds")} onMouseLeave={() => toggleDropdown(null)}>
              <span className="dropdown-title">Πτηνά</span>
              {dropdownOpen === "birds" && (
                <ul className="dropdown-menu">
                  <li><NavLink to="/birds/food">Τροφές</NavLink></li>
                  <li><NavLink to="/birds/accessories">Αξεσουάρ</NavLink></li>
                  <li><NavLink to="/birds/housing">Διαμονή και Μεταφορά</NavLink></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
