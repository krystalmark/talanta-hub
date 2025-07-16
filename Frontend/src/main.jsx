import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/custom.scss';
import 'aos/dist/aos.css';
import AOS from 'aos';

import { BrowserRouter } from 'react-router-dom'; // ✅ THIS LINE IS REQUIRED
import { AuthProvider } from './contexts/AuthContext';
import { OpportunitiesProvider } from './contexts/OpportunitiesContext';

AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OpportunitiesProvider>
          <App />
        </OpportunitiesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);