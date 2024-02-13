import React, { useEffect, useState } from 'react';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {

    fetch('http://127.0.0.1:5000/exchange/<id>')
      .then(response => response.json())
      .then(data => setExchanges(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Exchanges</h1>
      <ul>
        {exchanges.map(exchange => (
          <li key={exchange.id}>{exchange.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Exchanges;
