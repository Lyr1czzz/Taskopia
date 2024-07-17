import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth';

const Header = () => {

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated() ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;