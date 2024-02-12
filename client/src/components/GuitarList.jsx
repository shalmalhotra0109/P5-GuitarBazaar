import React, { useState, useEffect } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import Favorites from './Favorites';

function GuitarList() {
  const [guitars, setGuitars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(null); // Add userId state to track logged-in user

  useEffect(() => {
    // Fetch guitars from the server when the component mounts
    fetch(`http://127.0.0.1:5000/guitars`)
      .then((response) => response.json())
      .then((data) => setGuitars(data))
      .catch((error) => console.error('Error fetching guitars:', error));

    // Fetch user ID when the component mounts (you can replace this with your actual user authentication logic)
    fetch('http://127.0.0.1:5000/user/<id>')
      .then((response) => response.json())
      .then((data) => setUserId(data.userId))
      .catch((error) => console.error('Error fetching user ID:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLike = (guitarId) => {
    // Send a POST request to the server to like the guitar with the given ID
    fetch(`http://127.0.0.1:5000/user-likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, guitarId }), // Include userId in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the UI to reflect the like action
        setGuitars(prevGuitars =>
          prevGuitars.map(guitar =>
            guitar.id === guitarId ? { ...guitar, liked: true } : guitar
          )
        );
      })
      .catch((error) => console.error('Error liking guitar:', error));
  };

  // Filter guitars based on the search term
  const filteredGuitars = guitars.filter((guitar) =>
    guitar.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guitar.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
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
              {guitar.liked ? <span style={{ marginLeft: '10px', color: 'red' }}>Liked!</span> : null}
            </Accordion.Header>
            <Accordion.Body>
              <p><strong>Material:</strong> {guitar.material}</p>
              <p>{guitar.description}</p>
              <p><strong>Accepts Bids:</strong> {guitar.accept_bids ? 'Yes' : 'No'}</p>
              <p><strong>Accepts Exchanges:</strong> {guitar.accept_exchange ? 'Yes' : 'No'}</p>
              {/* Add like button here */}
              <Button variant="primary" onClick={() => handleLike(guitar.id)}>Like</Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      {/* Render FavoritesTab component if user is logged in */}
      {userId && <Favorites userId={userId} />}
    </div>
  );
}

export default GuitarList;


