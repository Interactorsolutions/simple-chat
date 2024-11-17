// Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const Header = () => {
  const navigate = useNavigate();
  const [user] = useState(AuthService.getCurrentUser());

  const handleLogout = () => {
    AuthService.logout();  // Clear user data from localStorage
    navigate('/login');     // Redirect to login page
  };

  return (
    <header>
      <nav>
        <div className="left-nav">
          <ul>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/integrations">Integrations</Link>
            </li>
          </ul>
        </div>
        <div className="right-nav">
          <ul>
            <li>
              <Link to="/settings">
                <span>{user.name}</span>
              </Link>
            </li>
            <li>
              {/* Logout button */}
              <button className="header-logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;