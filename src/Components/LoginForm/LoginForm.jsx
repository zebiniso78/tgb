import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import axios from 'axios';

import content from '../../Localization/Content';
import { LanguageContext } from '../../Context/Language';

import User from '../../Assets/Images/Login/user.png';
import { useNavigate } from 'react-router-dom';

function LoginTop() {
  const { language, setLanguage } = React.useContext(LanguageContext);

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
        <h2 className="login__title">{content[language].login_title}</h2>
        <select
          className="login__select-language"
          value={language}
          onChange={(evt) => {
            setLanguage(evt.target.value);
          }}
        >
          <option value="ru">{content[language].lang_ru}</option>
          <option value="uz">{content[language].lang_uz}</option>
        </select>
      </div>
      <div className="email-wrapper">
        <label htmlFor="username" className="username__label">
          {content[language].e_username}
        </label>
        <input
          className="username"
          type="username"
          name="username"
          id="username"
          placeholder={content[language].e_username}
          required
        />
      </div>
      <div className="password-wrapper">
        <label htmlFor="password" className="password__label">
          {content[language].e_password}
        </label>
        <input
          className="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder={content[language].e_password}
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
        {content[language].show_password}
      </label>

      <button className="login__button">{content[language].login_title}</button>
    </form>
  );
}

export default LoginTop;
