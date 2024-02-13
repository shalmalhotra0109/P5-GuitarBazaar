import React, { useState, useEffect } from 'react';
import { Accordion, Button } from 'react-bootstrap';

function UserGuitars({ userId }) {
  const [userGuitars, setUserGuitars] = useState([]);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    console.log('User ID in UserGuitars:', userId);
    // Fetch guitars associated with the logged-in user
    fetch(`http://127.0.0.1:5000/user/${userId}/guitars`)
      .then((response) => response.json())
      .then((data) => setUserGuitars(data))
      .catch((error) => console.error('Error fetching user guitars:', error));

    // Fetch user likes
    fetch(`http://127.0.0.1:5000/user/${userId}/likes`)
      .then((response) => response.json())
      .then((data) => setUserLikes(data))
      .catch((error) => console.error('Error fetching user likes:', error));
  }, [userId]);

  // Function to handle deleting a guitar (if needed)
  const handleDelete = (guitarId) => {
    // Send a DELETE request to the server to delete the guitar
    fetch(`http://127.0.0.1:5000/guitars/${guitarId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted guitar from the state
          setUserGuitars((prevGuitars) =>
            prevGuitars.filter((guitar) => guitar.id !== guitarId)
          );
        } else {
          console.error('Failed to delete guitar');
        }
      })
      .catch((error) => console.error('Error deleting guitar:', error));
  };

  return (
    <div>
      <h3>My Guitars</h3>
      <Accordion>
        {userGuitars.map((guitar) => (
          <Accordion.Item eventKey={guitar.id} key={guitar.id}>
            <Accordion.Header>
              {guitar.brand} - {guitar.model}
            </Accordion.Header>
            <Accordion.Body>
              <p><strong>Material:</strong> {guitar.material}</p>
              <p>{guitar.description}</p>
              {/* Add functionality to delete the guitar if needed */}
              <Button variant="danger" onClick={() => handleDelete(guitar.id)}>Delete</Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      
      <h3>My Likes</h3>
      <Accordion>
        {userLikes.map((like) => (
          <Accordion.Item eventKey={like.id} key={like.id}>
            <Accordion.Header>
              {like.guitar.brand} - {like.guitar.model}
            </Accordion.Header>
            <Accordion.Body>
              {/* Display any additional information about the liked guitar */}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default UserGuitars;
