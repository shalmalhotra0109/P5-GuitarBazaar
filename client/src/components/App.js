import React from 'react';
import {useState} from 'react'
import GuitarList from './GuitarList';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

// components need to know:
// USER, CURRENT GUITAR LIST, FILTERS: BY BRAND, MODEL, MATERIAL (could be written as json with brand, material etc)
function App() {
    const [users, setUsers]=useState({});
    return <GuitarList/>

}

export default App

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
