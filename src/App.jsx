import React from 'react';
import './App.css';

import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

import useToken from './Hooks/useToken';


function App() {

  const [token] =useToken();
  if (token) {
		return <AuthenticatedApp />;
	} else {
		return <UnauthenticatedApp />;
	}
}

export default App;
