import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pour mesurer les performances de l'app, on peut passer une fonction
// genre reportWebVitals(console.log) pour log les resultats
reportWebVitals();
