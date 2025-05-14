import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './LoginComp.jsx';

const root = document.getElementById('react-root');

if (root) {
  ReactDOM.createRoot(root).render(<LoginPage />);
}