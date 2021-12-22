import './LoginTop.css';
import Logo from '../../Assets/Images/Login/Logo.png';

function LoginTop() {
  return (
    <nav className="navbar">
      <img className="logo__image" src={Logo} alt="Logo" />
      <div className="logo__text-wrapper">
        <h2 className="logo__title">TDAU</h2>
        <p className="logo__info">Toshkent Davlat Agrar Universtiteti</p>
      </div>
    </nav>
  );
}

export default LoginTop;
