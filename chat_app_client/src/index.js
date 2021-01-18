import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import actionCable from 'actioncable';


const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App cableApp={CableApp}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
