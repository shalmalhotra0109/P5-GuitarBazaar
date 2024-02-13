import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import GuitarList from "./components/GuitarList";
import Home from "./components/Home";
import GuitarItem from "./components/UserGuitars";
import Favorites from "./components/Favorites";

const Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/guitar-list" element={<GuitarList />} />
      <Route path="/guitar-item/:id" element={<GuitarItem />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
};

export default Routes;
