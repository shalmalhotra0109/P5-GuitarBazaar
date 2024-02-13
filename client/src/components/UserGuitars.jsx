import {useState, useEffect} from 'react';
import { Accordion, Button, Form, Row, Col } from 'react-bootstrap';
import UpdateGuitar from './UpdateGuitar';
import MyNavbar from './Navbar';
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
 
  function deleteGuitar(guitarId) {
    // Confirm with the user before deletion
    const isConfirmed = window.confirm("Are you sure you want to delete? This is permanent.");
  
    if (isConfirmed) {
      // User clicked "OK", proceed with deletion
      fetch(`http://127.0.0.1:5000/guitar/${guitarId}`, {
        method: 'DELETE', // Assuming the backend expects a DELETE request for deletion
        headers: {
          'Content-Type': 'application/json',
          // Include any other headers your API requires, such as authentication tokens
        },
      })
      .then(response => {
        
        return response.json(); // or response.text() if the server does not send a JSON response
      })
      .then(data => {
        setUserGuitars(currentGuitars => currentGuitars.filter(guitar => guitar.id !== guitarId));
        alert('Guitar deleted successfully.');
        // Here, you might want to update the UI to reflect the deletion,
        // such as removing the guitar from a list displayed to the user
      })
      
    } else {
      // User clicked "Cancel", just exit the function
      console.log('Deletion canceled.');
    }
  }

  return (
    <div>
      <MyNavbar/>
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
               <UpdateGuitar guitarData={guitar}/>
               </Col>
               <Col>
              <Button variant='danger' onClick={()=>{deleteGuitar(guitar.id)}}>Delete</Button>
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
