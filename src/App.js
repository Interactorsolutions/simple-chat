import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './views/Register';
import Chat from './views/Chat';
import Integrations from './views/Integrations';
import Settings from './views/Settings';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* Define individual routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/settings" element={<Settings />} />
        {/* Redirect from "/" to "/login" */}
        <Route path="/" element={<Navigate to="/register" />} />
        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<Navigate to="/register" />} />
        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/chat" component={Chat} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;