import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MyNavbar = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand to="/guitars">Guitar Bazaar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/guitars">Home</Link>
            <Link to="/user-likes">Favorites</Link>
            <Link to={`/guitar/${storedUser.id}`}>User Guitars</Link>
            <Link to={`/exchange/${storedUser.id}`}>Exchanges</Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default MyNavbar;
