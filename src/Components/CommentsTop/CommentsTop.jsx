import React from 'react';
import './CommentsTop.css';

import content from '../../Localization/Content';
import { LanguageContext } from '../../Context/Language.js';

import Logo from '../../Assets/Images/Login/Logo.png';
function CommentsTop() {
  const { language } = React.useContext(LanguageContext);
  return (
    <nav className="comments__navbar sticky-top">
      <img className="logo__image-comment" src={Logo} alt="Logo" />
      <p className="logo__info-comment">{content[language].logo_info}</p>
    </nav>
  );
}

export default CommentsTop;
