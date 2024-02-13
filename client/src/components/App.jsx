import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import GuitarList from './GuitarList';
import LoginForm from './LoginForm';
import Favorites from './Favorites';
import UserGuitars from './UserGuitars';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [likedGuitars, setLikedGuitars] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  const handleLike = (guitarId) => {
    // Toggle like status
    if (likedGuitars.includes(guitarId)) {
      setLikedGuitars(likedGuitars.filter(id => id !== guitarId));
      // Remove like from server
      fetch(`http://127.0.0.1:5000/userlikes/${guitarId}`, {
        method: 'DELETE'
      })
      .catch(error => console.error('Error removing like:', error));
    } else {
      setLikedGuitars([...likedGuitars, guitarId]);
      // Add like to server
      fetch('http://127.0.0.1:5000/userlikes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guitar_id: guitarId })
      })
      .catch(error => console.error('Error adding like:', error));
    }
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn} />} />
          <Route path="/guitars" element={loggedIn ? <GuitarList likedGuitars={likedGuitars} onLike={handleLike} /> : <Navigate to="/login" />} />
          <Route path="/favorites" element={loggedIn ? <Favorites likedGuitars={likedGuitars} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

