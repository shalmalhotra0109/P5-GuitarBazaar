import React, { useEffect, useState } from 'react';

const GuitarList = () => {
  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    // Fetch guitars from the server when the component mounts
    fetch(`${serverURL}/guitars`)
      .then((response) => response.json())
      .then((data) => setGuitars(data))
      .catch((error) => console.error('Error fetching guitars:', error));
  }, []);

  return (
    <div>
      <h2>List of Guitars for Sale</h2>
      {guitars.map((guitar) => (
        <div key={guitar.id}>
          <h3>{guitar.model}</h3>
          <p>Description: {guitar.description}</p>
          {guitar.is_selling && (
            <div>
              <p>For Sale</p>
              <p>Price: ${guitar.price}</p>
            </div>
          )}
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default GuitarList;
