import React, { useState, useEffect } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Favorites from './Favorites';
import './GuitarList.css'; // Import the CSS file
import { FaGuitar } from "react-icons/fa";
import LikeButton from './LikeButton';

function GuitarList() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser)
  const [guitars, setGuitars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState([]); // Add userId state to track logged-in user

  // State to manage form input fields
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    material: '',
    description: '',
    accept_bids: false,
    accept_exchange: false
  });

  useEffect(() => {
    // Fetch guitars from the server when the component mounts
    fetch(`http://127.0.0.1:5000/guitars`)
      .then((response) => response.json())
      .then((data) => setGuitars(data))
      .catch((error) => console.error('Error fetching guitars:', error));

    // Fetch user ID when the component mounts (you can replace this with your actual user authentication logic)
    fetch(`http://127.0.0.1:5000/user/${storedUser.id}`)
      .then((response) => response.json())
      .then((data) =>{
        setUser(data)
        console.log(data)
      }
      )
      .catch((error) => console.error('Error fetching user :', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send a POST request to add a new guitar
    fetch(`http://127.0.0.1:5000/guitars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the UI to reflect the new guitar
        setGuitars(prevGuitars => [...prevGuitars, data]);
        // Clear the form data
        setFormData({
          brand: '',
          model: '',
          material: '',
          description: '',
          accept_bids: false,
          accept_exchange: false
        });
      })
      .catch((error) => console.error('Error adding guitar:', error));
  };

  // Filter guitars based on the search term
  const filteredGuitars = guitars.filter((guitar) =>
    guitar.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guitar.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Guitar List</h1>
      {/* Navigation links */}
      <nav>
        <ul>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/user-guitars">User Guitars</Link>
          </li>
        </ul>
      </nav>
      {/* Add guitar form */}
      <div className="add-guitar-form">
        <h2>Add Guitar</h2>
        <Form onSubmit={handleSubmit}>
          {/* Form controls */}
        </Form>
      </div>
      {/* Display guitars */}
      <div className="guitar-list-content">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search for a guitar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Accordion defaultActiveKey="0">
          {filteredGuitars.map((guitar) => (
            <Accordion.Item eventKey={guitar.id} key={guitar.id}>
              <Accordion.Header>
                {guitar.brand} - {guitar.model}
              </Accordion.Header>
              <Accordion.Body>
                <p><strong>Material:</strong> {guitar.material}</p>
                <p>{guitar.description}</p>
                <p><strong>Accepts Bids:</strong> {guitar.accept_bids ? 'Yes' : 'No'}</p>
                <p><strong>Accepts Exchanges:</strong> {guitar.accept_exchange ? 'Yes' : 'No'}</p>
                <LikeButton user={user} guitar = {guitar}/>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      {/* Render FavoritesTab component if user is logged in */}
      {user && <Favorites user={user.id} />}
    </div>
  );
}

export default GuitarList;

