import React from 'react';

import './CommentsTop.css';

import content from '../../Localization/Content';
import { LanguageContext } from '../../Context/Language.js';

import Logo from '../../Assets/Images/Login/Logo.png';
function CommentsTop() {
  const { language, setLanguage } = React.useContext(LanguageContext);

  

  return (
    <>
      <nav className="comments__navbar">
        <div className="comments__navbar-left">
          <img
            className="comments__navbar-image"
            src={Logo}
            alt="Logo"
            width={60}
            height={60}
          />
          <p className="comments__navbar-text">{content[language].logo_info}</p>
        </div>
        <div className="comments__navbar-right">
          <select
            className="select__language"
            value={language}
            onChange={(evt) => {
              setLanguage(evt.target.value);
            }}
          >
            <option value="ru">{content[language].lang_ru}</option>
            <option value="uz">{content[language].lang_uz}</option>
          </select>
        </div>
      </nav>
    </>
  );
}

export default CommentsTop;
