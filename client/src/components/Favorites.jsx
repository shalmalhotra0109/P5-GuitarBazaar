import React, { useEffect, useState } from 'react';
import { Accordion, Button, Form, Row, Col } from 'react-bootstrap';
import LikeButton from './LikeButton';
import MyNavbar from './Navbar';
import ExchangeForm from './ExchangeForm';
const Favorites = () => {
  const [likedGuitars, setLikedGuitars] = useState([]);
  const [user, setUser] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    // Fetch the user's liked guitars from the database
    fetch(`http://127.0.0.1:5000/user-like/${storedUser.id}`)
      .then(response => response.json())
      .then(data => {
        setLikedGuitars(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching liked guitars:', error);
      });
    }, []);
  useEffect(()=>{
      fetch(`http://127.0.0.1:5000/user/${storedUser.id}`)
      .then((response) => response.json())
      .then((data) =>{
        setUser(data)
        console.log(data)
      }
      )
      .catch((error) => console.error('Error fetching user :', error));

  }, [likedGuitars]);

  // Function to get the current user's ID
 

  return (
    <div>
       <MyNavbar/>
      <h1>Favorites</h1>
      {/* <ul>
        {likedGuitars.map(guitar => (
          <li key={guitar.id}>{guitar.model}</li>
        ))}
      </ul> */}
      <Accordion defaultActiveKey="0">
          {likedGuitars.map((guitar) => (
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
                <div onClick={()=>{ const lG = likedGuitars; const nLG = lG.filter(g=>g.id !== guitar.id); setLikedGuitars(nLG)}}>
                <LikeButton user={user} guitar = {guitar}/>
                </div>
                </Col>
                <Col>
                  {guitar.accept_exchange ?
                  <ExchangeForm wantGuitar={guitar} />:<></>  
                }
                </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
    </div>
  );
};

export default Favorites;
