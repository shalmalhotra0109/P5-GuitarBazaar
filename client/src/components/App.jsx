import React from 'react';
import {useState, useEffect} from 'react'
import GuitarList from './GuitarList';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

// import './App.css';

function App() {
  const [guitars, setGuitars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch guitars from the server when the component mounts
    fetch(`http://127.0.0.1:5000/guitars`)
      .then((response) => response.json())
      .then((data) => setGuitars(data))
      .catch((error) => console.error('Error fetching guitars:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogin = () => {
    // Perform login logic here
    console.log('Logging in with username:', username, 'and password:', password);
    // Assuming successful login, set loggedIn state to true
    setLoggedIn(true);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <div>
          {loggedIn ? (
            <span>Welcome, {username}!</span>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          )}
        </div>
        <h1 className="text-center">List of Guitars</h1>
        <div className="d-flex justify-content-center mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search guitars..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <GuitarList guitars={guitars} searchTerm={searchTerm} />
    </div>
  );
}

export default App;

// function App() {
//     const [users, setUsers] = useState({});
  
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1>List of Guitars</h1>
//           <SearchBar />
//           <GuitarList users={users} />
//         </header>
//       </div>
//     );
//   }
  
//   function SearchBar() {
//     return (
//       <div>
//         <input type="text" placeholder="Search guitars..." />
//         <button>Search</button>
//       </div>
//     );
//   }
  
//   function GuitarList({ users }) {
//     // Implement your guitar list rendering logic here
//     return (
//       <div>
//         {/* Map over the users array and render each guitar */}
//         {/* Example: */}
//         {users.map(user => (
//           <div key={user.id}>
//             <h2>{user.name}</h2>
//             {/* Render other guitar details here */}
//           </div>
//         ))}
//       </div>
//     );
//   }
  
//   export default App;
