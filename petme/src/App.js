// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Frontend/Menu";
import Hypernav from "./Frontend/Hypernav";
import CatFood from "./Frontend/CatFood";
// import AdminProductForm from "./Frontend/AdminProductForm";
function App() {
  return (
    <Router>
      <Hypernav />
      <Routes>
        <Route path="/" element={<Menu />} />
        {/* match the menu link exactly */}
        <Route path="/cats/food" element={<CatFood />} />
        {/* <Route path="/admin" element={<AdminProductForm />} /> */}
      </Routes>
    </Router>
  );
}

export default App;


