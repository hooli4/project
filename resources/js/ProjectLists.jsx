import React from 'react';
import ReactDOM from 'react-dom/client';
import ShowProjects from './ProjectListsComp.jsx';

const root = document.getElementById('react-root');

if (root) {
  ReactDOM.createRoot(root).render(<ShowProjects />);
}