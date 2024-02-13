import React, { useEffect, useState } from 'react';

const Favorites = () => {
  const [likedGuitars, setLikedGuitars] = useState([]);
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

  // Function to get the current user's ID
 

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {likedGuitars.map(guitar => (
          <li key={guitar.id}>{guitar.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
