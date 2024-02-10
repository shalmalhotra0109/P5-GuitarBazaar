import React, { useEffect, useState } from 'react';


const GuitarList = () => {
  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    // Fetch guitars from the server when the component mounts
    fetch(`/guitars`)
      .then((response) => response.json())
      .then((data) => setGuitars(data))
      .catch((error) => console.error('Error fetching guitars:', error));
  }, []);

  return (
    <div>
      <h2>List of Guitars</h2>
      <ul>
        {guitars.map(guitar => (
          <li key={guitar.id}>
            <h3>{guitar.brand} {guitar.model}</h3>
            <p><strong>Material:</strong> {guitar.material}</p>
            <p><strong>Description:</strong> {guitar.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuitarList;
