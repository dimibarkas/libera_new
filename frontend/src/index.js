import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import { store } from "./redux/persistence"
import { Provider } from "react-redux";
import { ProviderWrapper } from "./provider-wrapper"

ReactDOM.render(
  <Provider store={store}>
    <ProviderWrapper>
      <App />
    </ProviderWrapper>
  </Provider>,
  document.getElementById('root')
);

