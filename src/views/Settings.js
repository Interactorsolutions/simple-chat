// Settings.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../components/AuthService';
import Header from '../components/Header';

const Settings = () => {
  const navigate = useNavigate();
  const [user] = useState(AuthService.getCurrentUser());
  const [interactorUrl, setInteractorUrl] = useState('');
  const [interactorApiKey, setInteractorApiKey] = useState('');

  // Load current config on component mount
  useEffect(() => {
    // const {
    //     interactorUrl,
    //     interactorApiKey
    // } = require("../config");
    // Here, we simulate loading the config data, you can use localStorage or API to store/retrieve this data
    const currentConfig = {
      interactorUrl: '',
      interactorApiKey: '',
    };
    setInteractorUrl(currentConfig.interactorUrl);
    setInteractorApiKey(currentConfig.interactorApiKey);
  }, []);

  const handleSave = () => {
    const newConfig = {
      interactorUrl,
      interactorApiKey,
    };

    // Save the config (you can save it in localStorage or send it to an API)
    console.log('Updated Config:', newConfig);

    // Navigate back to a different page after saving
    navigate('/integrations');
  };

  return (
    <div className="main">
      <Header />
        <div style={{ padding: '20px' }}>
        <h2>Settings</h2>
        <form>
            <div>
            <label htmlFor="interactorUrl">Interactor URL:</label>
            <input
                type="text"
                id="interactorUrl"
                value={interactorUrl}
                placeholder='https://engine.interactor.com/api/v1/'
                onChange={(e) => setInteractorUrl(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            </div>
            <div>
            <label htmlFor="interactorApiKey">Interactor API Key: Go to <a href='https://saas-alpha.interactor.com/deployment/' target="_blank">engine.interactor.com</a> to use your own API Key</label>
            <input
                type="text"
                id="interactorApiKey"
                placeholder='Currently using a shared API Key'
                value={interactorApiKey}
                onChange={(e) => setInteractorApiKey(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            </div>
            <button
            type="button"
            onClick={handleSave}
            style={{ background: 'green', color: 'white', padding: '10px 20px', border: 'none' }}
            >
            Save Settings
            </button>
        </form>
        </div>
    </div>
  );
};

export default Settings;