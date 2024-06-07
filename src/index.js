import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_31d3GGmCC',
    userPoolWebClientId: 'b243lhpn3ct9lh6fb3non1br',
    identityPoolId: 'us-east-1:ed68cda5-65c8-4308-aac9-354df79e8f16',
    oauth: {
      domain: 'todocog.auth.us-east-1.amazoncognito.com',
      scope: ['openid'],
      redirectSignIn: 'http://localhost:3001/',
      redirectSignOut: 'http://localhost:3001/',
      responseType: 'code'
    }
  }
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
