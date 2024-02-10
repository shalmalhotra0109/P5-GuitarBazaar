import React from 'react';
import {useState} from 'react'
import GuitarList from './GuitarList';
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBar from './SearchBar'; // Import the SearchBar component

function App() {
  const [users, setUsers] = useState({});

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        <SearchBar />
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <GuitarList guitars={guitars} />
        </div>
      </div>
    </div>
  );
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
