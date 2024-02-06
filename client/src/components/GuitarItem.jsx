import React, { useState } from 'react';

const GuitarItem = ({ guitar }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [exchangeGuitar, setExchangeGuitar] = useState('');

  const handleBidClick = () => {
    // Logic to handle placing a bid
    console.log(`Placing bid for ${guitar.model} with amount ${bidAmount}`);
    // You can send the bid to your backend API here
  };

  const handleExchangeClick = () => {
    // Logic to handle offering an exchange
    console.log(`Offering exchange for ${guitar.model} with ${exchangeGuitar}`);
    // You can send the exchange offer to your backend API here
  };

  return (
    <div className="guitar-item">
      <h3>{guitar.model}</h3>
      <p>{guitar.description}</p>
      <p>Price: {guitar.isSelling ? `$${guitar.price}` : 'Not for sale'}</p>

      {/* Place Bid Button */}
      {guitar.isSelling && (
        <>
          <button onClick={handleBidClick}>Place Bid</button>
          <input
            type="text"
            placeholder="Enter bid amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
        </>
      )}

      {/* Offer Exchange Button */}
      {guitar.isSelling && (
        <>
          <button onClick={handleExchangeClick}>Offer Exchange</button>
          <select value={exchangeGuitar} onChange={(e) => setExchangeGuitar(e.target.value)}>
            <option value="">Select a guitar to exchange</option>
            {/* Display the user's guitars as options */}
            {/* Replace 'userGuitars' with the actual data source for user's guitars */}
            {/* Example: {userGuitars.map((g) => <option key={g.id} value={g.id}>{g.model}</option>)} */}
          </select>
        </>
      )}
    </div>
  );
};

export default GuitarItem;