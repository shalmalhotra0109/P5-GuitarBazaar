import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

function GuitarList() {
  const [guitars, setGuitars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch guitars from the server when the component mounts
    fetch(`http://127.0.0.1:5000/guitars`)
      .then((response) => response.json())
      .then((data) => setGuitars(data))
      .catch((error) => console.error('Error fetching guitars:', error));
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
      body: JSON.stringify({ guitarId }),
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

  return (
    <Accordion defaultActiveKey="0">
      {guitars.map((guitar) => (
        <Accordion.Item eventKey={guitar.id} key={guitar.id}>
          <Accordion.Header>
            {guitar.brand} - {guitar.model}
            {guitar.liked ? <span style={{ marginLeft: '10px', color: 'red' }}>Liked!</span> : null}
          </Accordion.Header>
          <Accordion.Body>
            <p><strong>Material:</strong> {guitar.material}</p>
            <p>{guitar.description}</p>
            {/* Add like button here */}
            <Button variant="primary" onClick={() => handleLike(guitar.id)}>Like</Button>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default GuitarList;
