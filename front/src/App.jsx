import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ListUsers from "./pages/ListUsers/ListUsers";
import StatusCat from "./pages/StatusCat/StatusCat";
import RandomDog from "./pages/RandomDog/RandomDog";
import Crud from "./pages/Crud/Crud";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListUsers />} />
        <Route exact path="/status-cat" element={<StatusCat />} />
        <Route exact path="/dog-random" element={<RandomDog />} />
        <Route exact path="/crud" element={<Crud />} />
      </Routes>
    </Router>
  );
};

export default App;
