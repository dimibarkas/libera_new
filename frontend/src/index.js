import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import { ProviderWrapper } from "./provider-wrapper"
import { store } from "./redux/persistence"
import { Provider } from "react-redux";
import CircularIndeterminate from "./components/circular-indeterminate"
import { PersistGate } from "redux-persist/integration/react"
import { persistor } from "./redux/persistence"

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<CircularIndeterminate />} persistor={persistor}>
      <ProviderWrapper>
        <App />
      </ProviderWrapper>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

