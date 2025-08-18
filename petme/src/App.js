// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bucket from "./Frontend/Bucket";
import Favorites from "./Frontend/Favorites";
import Menu from "./Frontend/Menu";
import Hypernav from "./Frontend/Hypernav";
import CatFood from "./Frontend/CatFood";
import DogFood from "./Frontend/DogFood";
import BirdFood from "./Frontend/BirdFood";
import CatAccessories from "./Frontend/CatAccessories";
import BirdCages from "./Frontend/BirdCages";
import DogAccessories from "./Frontend/DogAccessories";

import SignIn from "./Frontend/SignIn";
import SignUp from "./Frontend/SignUp";
import { AuthProvider } from "./Frontend/AuthProvider";
import ProtectedRoute from "./Frontend/ProtectedRoute";

// (Προαιρετικό) Admin σελίδα — βάλε το component σου ή αφαίρεσε αυτά αν δεν το έχεις ακόμα


function App() {
  return (
    <Router>
      {/* Τύλιξε ΟΛΗ την app με AuthProvider για να έχουν πρόσβαση τα components στον χρήστη */}
      <AuthProvider>
        <Hypernav />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Menu />} />
          <Route path="/dogs/food" element={<DogFood />} />
          <Route path="/dogs/dogaccessories" element={<DogAccessories />} />
          <Route path="/birds/food" element={<BirdFood />} />
          <Route path="/birds/cages" element={<BirdCages />} />
          <Route path="/cats/food" element={<CatFood />} />
          <Route path="/cats/cataccessories" element={<CatAccessories />} />

          {/* Auth routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected route (μόνο για συνδεδεμένους) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                 <Bucket />
      </ProtectedRoute>
              
            }
          />
          <Route
    path="/favorites"
    element={
      <ProtectedRoute>
        <Favorites />
      </ProtectedRoute>
    }
  />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
