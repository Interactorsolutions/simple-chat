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
              <span>{user.name}</span>
            </li>
            <li>
              {/* Logout button */}
              <button className="header-logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
            <li>
              <a href="https://github.com/Interactorsolutions/simple-chat/" target="_blank" rel="noopener noreferrer" class="github-link header-page-github" aria-label="GitHub repository"></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;