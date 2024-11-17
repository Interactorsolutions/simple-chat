import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../components/AuthService';
import Header from '../components/Header';
import { connectors } from '../components/interactor_engine/GetConnectorList';
import '../assets/style/custom.css';
import { gmailActions } from '../components/interactor_engine/GetActionList'; // Import List of available Actions
import executeAction from '../components/interactor_engine/ExecuteAction'; // Import executeAction

const Chat = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]); // Array to store chat messages
  const [message, setMessage] = useState(''); // Current message being typed
  const [filteredOptions, setFilteredOptions] = useState([]); // Filtered list of connectors
  const [actionLabels, setActionLabels] = useState([]); // Filtered list of actions
  const [showPopup, setShowPopup] = useState(false); // Show or hide connector popup
  const [showActionPopup, setShowActionPopup] = useState(false); // Show or hide action popup
  const [selectedAction, setSelectedAction] = useState(null); // Store the selected action
  const [formData, setFormData] = useState({}); // Store input values for schema form

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      navigate('/login'); // Redirect to login if user is not authenticated
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    // Check if "/" is entered
    if (value.includes('/')) {
      const query = value.split('/').pop(); // Get text after "/"
      const connectorName = connectors.map((item) => item.name);

      const matches = connectorName.filter((option) =>
        option.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredOptions(matches);
      setShowPopup(matches.length > 0); // Show popup if there are matches
    } else {
      setShowPopup(false); // Hide popup if "/" is removed
    }
  };

  const handleOptionClick = (option) => {
    const prefix = message.slice(0, message.lastIndexOf('/') + 1); // Text before "/"
    setMessage(`${prefix}${option} `); // Add selected option to input
    setShowPopup(false); // Hide popup after selection

    // Check if the selected option is "gmail" and update action labels
    if (option === 'gmail') {
      const labels = gmailActions.map((action) => action.label.en); // Extract "label.en"
      setActionLabels(labels);
      setShowActionPopup(true); // Show action popup
    } else {
      setActionLabels([]); // Clear action labels if not "gmail"
      setShowActionPopup(false); // Hide action popup
    }
  };

  const handleActionClick = (action) => {
    const prefix = message.trim(); // Preserve the current message content
    setMessage(`${prefix} ${action} `); // Append selected action to input
    const selected = gmailActions.find((a) => a.label.en === action); // Find the selected action
    setSelectedAction(selected); // Store the selected action
    setShowActionPopup(false);

    setFormData(
      selected.schema.variables.reduce((acc, variable) => {
        acc[variable.name] = ''; // Initialize input values
        return acc;
      }, {})
    ); // Initialize form data with empty values
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // Add the new message to the message array
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: user.name, text: message },
      ]);
      setMessage(''); // Clear the input field
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(); // Trigger send message on Enter
      e.preventDefault(); // Prevent default Enter key behavior
    }
  };

  const handleFormChange = (e, variableName) => {
    setFormData((prev) => ({
      ...prev,
      [variableName]: e.target.value, // Update only the specific field
    }));
  };

  const handleCancelAction = () => {
    setSelectedAction(null); // Close the popup
    setFormData({});
  };

  return (
    <div className="main">
      <Header />
      <div>
        <div className="chat-container">
          <div className="chat-messages-container">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message-bubble ${msg.sender === user.name ? 'sent' : 'received'}`}
                >
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))
            ) : (
              <div>
                <h2>Welcome to the Chat, {user?.name}!</h2>
                <p>Start the conversation! or use "<b>/</b>" to run an action.</p>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <input
              id="chat-input"
              type="text"
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Listen for Enter key press
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage} className="chat-send-button">
              Send
            </button>
            {showPopup && (
              <div className="chat-popup">
                <div className="chat-popup-title">Select a connector</div>
                {filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="chat-popup-option"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            {showActionPopup && (
              <div className="chat-popup">
                <div className="chat-popup-title">Select an action to execute</div>
                {actionLabels.map((label, index) => (
                  <div
                    key={index}
                    onClick={() => handleActionClick(label)}
                    className="chat-popup-option"
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}

            {selectedAction && (
              <div className="chat-action-form">
                <div className="chat-popup-title">{selectedAction.label.en} : Enter input field</div>
                <div className="chat-popup-content">
                  {selectedAction.schema.variables.map((variable) => (
                    <div className="chat-action-form-fields" key={variable.name}>
                      <span className="chat-action-form-fields-label">
                        <label>
                          {variable.title}:
                        </label>
                      </span>
                      <input
                          type="text"
                          value={formData[variable.input]}
                          onChange={(e) => handleFormChange(e, variable.name)}
                        />
                    </div>
                  ))}
                </div>
                <div className="chat-action-buttons">
                  <button onClick={handleCancelAction}>Cancel</button>
                  <button onClick={executeAction}>Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;