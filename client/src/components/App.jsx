import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import LoginForm from "./LoginForm";
import GuitarList from "./GuitarList";
import Favorites from "./Favorites";
import UserGuitars from "./UserGuitars";
import Bids from "./Bids";
import Exchanges from "./Exchanges";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/guitars" element={<GuitarList />} />
        <Route path="/user-likes" element={<Favorites />} />
        <Route path="/guitar/:id" element={<UserGuitars />} /> {}
        <Route path="/bid/:id" element={<Bids />} /> {}
        <Route path="/exchange/:id" element={<Exchanges />} /> {}
      </Routes>
    </Router>
  );
};

export default App;

