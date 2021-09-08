import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes.js';
import reportWebVitals from './reportWebVitals';
import ModalProvider from "./contexts/modalContext"


ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <Routes />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
