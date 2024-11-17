// Registeration page
import React, { useState } from 'react';
import AuthService from '../components/AuthService';
import { useNavigate } from 'react-router-dom';
import '../assets/style/custom.css';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleRegister = () => {
    if (name && username && password) {
      const credentials = { name, username, password };
      sessionStorage.setItem('userCredentials', JSON.stringify(credentials));

      AuthService.register(name, username, password)
        .then(() => {
          navigate('/chat'); // Use navigate() to redirect to the chat route
        })
        .catch((err) => {
          setError('Registration failed: ' + err.message);
        });
    } else {
      setError('Please enter all fields.');
    }
  };

  return (
    <div className="register-container">
      <a href="https://github.com/Interactorsolutions/simple-chat/" target="_blank" rel="noopener noreferrer" class="github-link register-page-github" aria-label="GitHub repository"></a>
      <h2 className="register-title">Create Your Account</h2>
      {error && <p className="register-error">{error}</p>}
      <form className="register-form">
        <label>First Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-input"
        />
        <label>Email</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <button
          type="button"
          onClick={handleRegister}
          className="register-button"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;