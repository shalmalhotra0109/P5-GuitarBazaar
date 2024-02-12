import React, { useState, useEffect } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import Favorites from './Favorites';
import './GuitarList.css'; // Import the CSS file

function GuitarList() {
  const [guitars, setGuitars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(null); // Add userId state to track logged-in user

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
    fetch(`http://127.0.0.1:5000/user/id`)
      .then((response) => response.json())
      .then((data) => setUserId(data.userId))
      .catch((error) => console.error('Error fetching user ID:', error));
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
    <div className="guitar-list-container">
      {/* Add guitar form */}
      <div className="add-guitar-form">
        <h2>Add Guitar</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="material">
            <Form.Label>Material</Form.Label>
            <Form.Control
              type="text"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="accept_bids">
            <Form.Check
              type="checkbox"
              label="Accept Bids"
              name="accept_bids"
              checked={formData.accept_bids}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="accept_exchange">
            <Form.Check
              type="checkbox"
              label="Accept Exchange"
              name="accept_exchange"
              checked={formData.accept_exchange}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Guitar
          </Button>
        </Form>
      </div>

      {/* Rest of the content */}
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
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      {/* Render FavoritesTab component if user is logged in */}
      {userId && <Favorites userId={userId} />}
    </div>
  );
}

export default GuitarList;
