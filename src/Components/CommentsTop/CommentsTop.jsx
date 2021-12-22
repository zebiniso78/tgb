import React from 'react';
import './CommentsTop.css';

import Logo from '../../Assets/Images/Login/Logo.png';
function CommentsTop() {
  return (
    <nav className="comments__navbar">
      <img className="logo__image-comment" src={Logo} alt="Logo" />
      <p className="logo__info-comment">Toshkent Davlat Agrar Universtiteti</p>
    </nav>
  );
}

export default CommentsTop;
