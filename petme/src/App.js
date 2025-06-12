// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Frontend/Menu"; // Make sure path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
