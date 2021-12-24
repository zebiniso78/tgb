import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Pages/Main/Main';
import Login from './Pages/LogIn/Login';
import UserComplain from './Pages/UserComplain/UserComplain';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/complain/:id" element={<UserComplain />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
