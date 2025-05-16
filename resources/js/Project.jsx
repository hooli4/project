import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './ProjectComp';

function App2() {
    return (
        <Router>
            <Routes>
                <Route path="/project/:project_id" element={<App />} />
            </Routes>
        </Router>
    );
}

const root = document.getElementById('react-root');

if (root) {
  ReactDOM.createRoot(root).render(<App2 />);
}