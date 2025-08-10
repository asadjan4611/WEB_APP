import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Note: Using new React 18 API
import App from './App.jsx';
import Store from './assets/redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// React 18+ recommended way to render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>

);