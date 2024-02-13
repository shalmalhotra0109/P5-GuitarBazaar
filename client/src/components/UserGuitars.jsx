import {useState, useEffect} from 'react';
import { Accordion, Button, Form, Row, Col } from 'react-bootstrap';
const UserGuitars = () => {
  const [userGuitars, setUserGuitars] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    // Fetch the user's user guitars from the database
    fetch(`http://127.0.0.1:5000/guitar/${storedUser.id}`)
      .then(response => response.json())
      .then(data => {
        setUserGuitars(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching user guitars:', error);
      });
  }, []);

  // Function to get the current user's ID
 

  return (
    <div>
      <h1>User guitars</h1>
      {/* <ul>
        {userGuitars.map(guitar => (
          <li key={guitar.id}>{guitar.name}</li>
        ))}
      </ul> */}
      <Accordion defaultActiveKey="0">
          {userGuitars.map((guitar) => (
            <Accordion.Item eventKey={guitar.id} key={guitar.id}>
              <Accordion.Header>
                {guitar.brand} - {guitar.model}
              </Accordion.Header>
              <Accordion.Body>
                <p><strong>Material:</strong> {guitar.material}</p>
                <p>{guitar.description}</p>
                <p><strong>Accepts Bids:</strong> {guitar.accept_bids ? 'Yes' : 'No'}</p>
                <p><strong>Accepts Exchanges:</strong> {guitar.accept_exchange ? 'Yes' : 'No'}</p>
               <Row>
                <Col>
               <Button variant='info'>update</Button>
               </Col>
               <Col>
              <Button variant='danger'>Delete</Button>
              </Col>
              </Row>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
    </div>
  );
};


export default UserGuitars;
