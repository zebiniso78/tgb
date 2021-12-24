import React from 'react';
import './LoginTop.css';
import Logo from '../../Assets/Images/Login/Logo.png';

import content from '../../Localization/Content';
import { LanguageContext } from '../../Context/Language.js';

function LoginTop() {
  const { language } = React.useContext(LanguageContext);
  return (
    <nav className="navbar">
      <img className="logo__image" src={Logo} alt="Logo" />
      <div className="logo__text-wrapper">
        <h2 className="logo__title">{content[language].logo_title}</h2>
        <p className="logo__info">{content[language].logo_info}</p>
      </div>
    </nav>
  );
}

export default LoginTop;
