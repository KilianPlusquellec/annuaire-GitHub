import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import App from './components/App/App';
import Accueil from './page/accueil';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/annuaire-GitHub" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);