import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';

function Favorites({ userId }) {
  const [likedGuitars, setLikedGuitars] = useState([]);

  useEffect(() => {
    // Fetch liked guitars for the user when the component mounts
    fetch(`http://127.0.0.1:5000/user-likes/${userId}`)
      .then((response) => response.json())
      .then((data) => setLikedGuitars(data))
      .catch((error) => console.error('Error fetching liked guitars:', error));
  }, [userId]);

  return (
    <Accordion defaultActiveKey="0">
      {likedGuitars.map((guitar) => (
        <Accordion.Item eventKey={guitar.id} key={guitar.id}>
          <Accordion.Header>
            {guitar.brand} - {guitar.model}
          </Accordion.Header>
          <Accordion.Body>
            <p><strong>Material:</strong> {guitar.material}</p>
            <p>{guitar.description}</p>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default Favorites;

