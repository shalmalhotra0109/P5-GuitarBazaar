import React, { useEffect, useState } from 'react';

const Bids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    // Fetch bids from the database for the logged-in user
    const userId = 'user1'; // Replace with the actual logged-in user ID
    fetch(`http://127.0.0.1:5000/bid/${userId}`)
      .then(response => response.json())
      .then(data => setBids(data))
      .catch(error => console.error('Error fetching bids:', error));
  }, []);

  return (
    <div>
      <h1>Your Bids</h1>
      {bids.length > 0 ? (
        <ul>
          {bids.map(bid => (
            <li key={bid.id}>{bid.amount}</li>
          ))}
        </ul>
      ) : (
        <p>No bids found.</p>
      )}
    </div>
  );
};

export default Bids;
