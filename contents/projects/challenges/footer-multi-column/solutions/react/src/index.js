import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

import ToastContextProvider from './context/ToastContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </Router>
  </React.StrictMode>,
);
