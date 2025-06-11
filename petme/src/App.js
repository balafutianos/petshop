
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Frontend/Menu"; // Import your Home component

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route - this will render Home.jsx */}
        <Route path="/" element={<Signup />} />
        
      </Routes>
    </Router>
  );
}

export default App;