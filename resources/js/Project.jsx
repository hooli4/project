import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ProjectComp.jsx';

const root = document.getElementById('react-root');

if (root) {
  ReactDOM.createRoot(root).render(<App />);
}