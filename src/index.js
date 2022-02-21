import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import keycloak, { keycloakProviderConfig } from './services/HandlerKeycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web'

ReactDOM.render(
  <ReactKeycloakProvider authClient={keycloak} initConfig={keycloakProviderConfig}>
    <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </React.StrictMode>
  </ReactKeycloakProvider>,
  document.getElementById('root'),
);
