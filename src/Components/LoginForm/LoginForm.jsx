import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import axios from 'axios';

import User from '../../Assets/Images/Login/user.png';
import { useNavigate } from 'react-router-dom';

function LoginTop() {
  
  const navigate = useNavigate();
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { username, password } = evt.target.elements;

    let bodyFormData = new FormData();
    bodyFormData.append('username', username.value.trim());
    bodyFormData.append('password', password.value.trim());

    await axios({
      method: 'post',
      url: 'http://192.168.43.165:1122/api/login',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
      //headers: { 'Content-Type': 'multipart/form-data', 'x-access-token' : token },
    })
      .then(function (response) {
        const { data } = response;
        localStorage.setItem('token', data.token);
        navigate('/main');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/main');
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="login__form">
      <div className="user-wrapper">
        <img className="user__img" src={User} alt="User" />
      </div>
      <div className="login__title-wrapper">
        <h2 className="login__title">Log In</h2>
        <select className="login__select-language">
          <option value="en">English</option>
          <option value="ru">Russian</option>
          <option value="uz">Uzbek</option>
        </select>
      </div>
      <div className="email-wrapper">
        <label htmlFor="username" className="username__label">
          Enter your username here
        </label>
        <input
          className="username"
          type="username"
          name="username"
          id="username"
          placeholder="Enter your username here"
          required
        />
      </div>
      <div className="password-wrapper">
        <label htmlFor="password" className="password__label">
          Enter your password here
        </label>
        <input
          className="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder="Enter your password here"
          required
        />
      </div>
      <input
        type="checkbox"
        className="show-password__input"
        id="show-password"
        name="show-password"
        onClick={tooglePassword}
      />
      <label htmlFor="show-password" className="show-password__label">
        Show password
      </label>

      <button className="login__button">Log In</button>
    </form>
  );
}

export default LoginTop;
