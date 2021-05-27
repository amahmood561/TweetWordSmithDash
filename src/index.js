import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";
// core styles
import "../src/scss/volt.scss";
import {Login} from './pages/login/login.jsx';

// vendor styles
import "@fortawesome/fontawesome-free"
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";
import HomePage from './pages/homepage/HomePage';

ReactDOM.render(
    <HashRouter>
        <HomePage />
    </HashRouter>,
  document.getElementById('root')
);
// <App />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
