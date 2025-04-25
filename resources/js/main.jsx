import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Импорт твоего компонента
import '../css/index.css';   // Импорт CSS, если ты положил его в resources/css/index.css

const root = document.getElementById('react-root');

if (root) {
  ReactDOM.createRoot(root).render(<App />);
}