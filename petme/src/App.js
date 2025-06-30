// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Frontend/Menu";
import Hypernav from "./Frontend/Hypernav";
import Slideshow from "./Frontend/Slideshow";
import Products from "./Frontend/Products";

function App() {
  return (
    <Router>
      <Hypernav />
      
      <Routes>
        <Route path="/" element={<Menu />} />
        {/* other routes can go here */}
      </Routes>
    </Router>
  );
}

export default App;
