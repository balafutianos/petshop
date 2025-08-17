// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Frontend/Menu";
import Hypernav from "./Frontend/Hypernav";
import CatFood from "./Frontend/CatFood";
import DogFood from "./Frontend/DogFood";
import BirdFood from "./Frontend/BirdFood";
import CatAccessories from "./Frontend/CatAccessories";
import BirdCages from "./Frontend/BirdCages";
import DogAccessories from './Frontend/DogAccessories';

function App() {
  return (
    <Router>
      <Hypernav />
      <Routes>
       <Route path="/" element={<Menu />} />
       <Route path="/dogs/food" element={<DogFood />} />
       <Route path="/dogs/dogaccessories" element={<DogAccessories />} />
       <Route path="/birds/food" element={<BirdFood />} />
       <Route path="/birds/cages" element={<BirdCages />} />
       <Route path="/cats/food" element={<CatFood />} />
       <Route path="/cats/cataccessories" element={<CatAccessories />} />
       
      </Routes>
    </Router>
  );
}

export default App;


