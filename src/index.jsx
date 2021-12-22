import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

// shu yerga

import './index.css';
//import '~bootstrap/scss/bootstrap';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider as AuthProvider } from './Context/Authentification';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
