import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import GuitarList from './GuitarList';
import Favorites from './Favorites';
import UserGuitars from './UserGuitars'; // Assuming you have a component for displaying user's guitars

function Home() {
  const [userId, setUserId] = useState(null); // Add userId state to track logged-in user

  useEffect(() => {
    // Fetch user ID when the component mounts (you can replace this with your actual user authentication logic)
    fetch('http://127.0.0.1:5000/user/<id>')
      .then((response) => response.json())
      .then((data) => {
        console.log('User ID:', data.userId);
        setUserId(data.userId);
      })
      .catch((error) => console.error('Error fetching user ID:', error));
  }, []);
  

  return (
    <div>
      <Tabs defaultActiveKey="guitar-list" id="home-tabs">
        <Tab eventKey="guitar-list" title="Guitar List">
          <GuitarList userId={userId} />
        </Tab>
        <Tab eventKey="favorites" title="Favorites">
          {userId && <Favorites userId={userId} />}
        </Tab>
        <Tab eventKey="my-guitars" title="My Guitars">
          {/* Render MyGuitars component here */}
          {userId && <UserGuitars userId={userId} />}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Home;

