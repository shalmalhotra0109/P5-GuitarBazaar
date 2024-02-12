import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';


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

  // Filter guitars based on search term
  const filteredGuitars = guitars.filter((guitar) =>
    guitar.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Accordion defaultActiveKey="0">
      {filteredGuitars.map((guitar) => (
        <Accordion.Item eventKey={guitar.id} key={guitar.id}>
          <Accordion.Header>{guitar.brand} - {guitar.model}</Accordion.Header>
          <Accordion.Body>
            <p><strong>Material:</strong> {guitar.material}</p>
            <p>{guitar.description}</p>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default GuitarList;