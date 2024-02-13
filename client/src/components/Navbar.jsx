import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/userguitars">User Guitars</Link>
        </li>
        {/* Add more links for other pages */}
      </ul>
    </nav>
  );
};

export default Navbar;
