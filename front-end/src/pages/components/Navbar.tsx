import '../../styles/navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/navbar/logo-Furniro.png';
import login from '../../assets/images/navbar/login.svg';
import search from '../../assets/images/navbar/search.svg';
import favorites from '../../assets/images/navbar/heart.svg';
import cart from '../../assets/images/navbar/cart.svg';
import loginGold from '../../assets/images/navbar/login-gold.png';
import searchGold from '../../assets/images/navbar/search-gold.png';
import favoritesGold from '../../assets/images/navbar/heart-gold.png';
import cartGold from '../../assets/images/navbar/cart-gold.png';



const Navbar = () => {
  return (
    <nav>
      <div className='nav-container'>
      <Link className="link-logo" to="/"><img className="logo-furniro" src={logo} alt="Logo Furniro" /></Link>       

        <ol className="menu-list">
          <li className="nav-item li-home">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item li-shop">
            <Link className="nav-link" to="/shop">Shop</Link>
          </li>
          <li className="nav-item li-about">
            <Link className="nav-link" to="#">About</Link>
          </li>
          <li className="nav-item li-contact">
            <Link className="nav-link" to="#">Contact</Link>
          </li>
        </ol>

        <div className="nav-actions">
          <Link className="icon-link" to="#">
            <img className="login-icon default-icon" src={login} alt="" />
            <img className="login-icon gold-icon" src={loginGold} alt="" />
          </Link>
          <Link className="icon-link" to="#">
            <img className="search-icon default-icon" src={search} alt="" />
            <img className="search-icon gold-icon" src={searchGold} alt="" />
          </Link>
          <Link className="icon-link" to="#">
            <img className="favorites-icon default-icon" src={favorites} alt="" />
            <img className="favorites-icon gold-icon" src={favoritesGold} alt="" />
          </Link>
          <Link className="icon-link" to="#">
            <img className="cart-icon default-icon" src={cart} alt="" />
            <img className="cart-icon gold-icon" src={cartGold} alt="" />
          </Link>
        </div>

      </div>
    </nav>
  );    
}

export default Navbar;
