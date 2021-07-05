import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import { ProviderWrapper } from "./provider-wrapper"

ReactDOM.render(
  <React.StrictMode>
    <ProviderWrapper>
      <App />
    </ProviderWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

