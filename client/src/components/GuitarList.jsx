import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function GuitarList({ guitars }) {
 
  
  
  return (
    <Accordion defaultActiveKey="0">
      {guitars.map((guitar) => (
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
