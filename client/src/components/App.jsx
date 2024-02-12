import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importing Routes and Navigate
import { useState } from 'react';
import GuitarList from './GuitarList';
import LoginForm from './LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn} />} />
          <Route path="/guitars" element={loggedIn ? <GuitarList /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
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
