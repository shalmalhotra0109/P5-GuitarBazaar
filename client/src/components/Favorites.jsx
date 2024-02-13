import React, { useEffect, useState } from 'react';

const Favorites = () => {
  const [likedGuitars, setLikedGuitars] = useState([]);

  useEffect(() => {
    // Fetch the user's liked guitars from the database
    fetch(`/http://127.0.0.1:5000/user-likes/${getCurrentUserId()}`)
      .then(response => response.json())
      .then(data => {
        setLikedGuitars(data);
      })
      .catch(error => {
        console.error('Error fetching liked guitars:', error);
      });
  }, []);

  // Function to get the current user's ID
  const getCurrentUserId = () => {
    // Replace this with your logic to get the current user's ID
    // For example, if you are using authentication tokens, you can decode the token
    // and extract the user ID from it
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decode the token to get the user ID
      const decodedToken = decodeToken(token);
      return decodedToken.userId;
    } else {
      // If no token is found, return a default user ID
      return 'user123';
    }
  };

  // Function to decode the authentication token
  const decodeToken = (token) => {
    // Replace this with your token decoding logic
    // For example, if you are using JWT, you can use a library like 'jsonwebtoken'
    // to decode the token and extract the user ID
    // Here's an example using 'jsonwebtoken':
    // const decodedToken = jwt.decode(token);
    // return decodedToken;
    return { userId: 'user123' }; // Replace with your actual decoding logic
  };

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
