import React from 'react';
import ReactDOM from 'react-dom/client';
import RegistrationPage from './RegisterComp.jsx';

const root = document.getElementById('react-root');

if (root) {
  ReactDOM.createRoot(root).render(<RegistrationPage />);
}