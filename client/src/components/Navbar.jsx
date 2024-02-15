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
            <Nav.Link as={Link} to="/guitars" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/user-likes" className="nav-link">Favorites</Nav.Link>
            <Nav.Link as={Link} to={`/guitar/${storedUser.id}`} className="nav-link">User Guitars</Nav.Link>
            <Nav.Link as={Link} to={`/exchange/${storedUser.id}`} className="nav-link">Exchanges</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default MyNavbar;

