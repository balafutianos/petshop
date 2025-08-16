// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Frontend/Menu";
import Hypernav from "./Frontend/Hypernav";
import CatFood from "./Frontend/CatFood";
import DogFood from "./Frontend/DogFood";
// import AdminProductForm from "./Frontend/AdminProductForm";
function App() {
  return (
    <Router>
      <Hypernav />
      <Routes>
        <Route path="/" element={<Menu />} />
       <Route path="/dogs/food" element={<DogFood />} />
        <Route path="/cats/food" element={<CatFood />} />
       
      </Routes>
    </Router>
  );
}

export default App;


