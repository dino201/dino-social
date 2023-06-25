import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.scss';
import "./i18n/i18n";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DarkModeContextProvider } from './context/darkModeContext';
import { store } from './store';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </Provider >
  // </React.StrictMode>
);


reportWebVitals();
