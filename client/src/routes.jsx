import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import GuitarList from "./components/GuitarList";
import Home from "./components/Home";
import GuitarItem from "./components/UserGuitars";
import Favorites from "./components/Favorites";
import UserGuitars from "./components/UserGuitars";

const Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<GuitarList />} />
      <Route path="/guitar-item/:id" element={<UserGuitars />} />
      {/* Update the route paths */}
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/user-guitars" element={<UserGuitars />} />
    </Routes>
  );
};

export default Routes;

