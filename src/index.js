import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TimerProvider } from './context/TimerContext'; // ✅ import your provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TimerProvider> {/* ✅ wrap with context provider */}
      <App />
    </TimerProvider>
  </React.StrictMode>
);

reportWebVitals();
