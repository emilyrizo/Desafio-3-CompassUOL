import '../../styles/navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/navbar/logo-Furniro.png';
import login from '../../assets/images/navbar/login.svg';
import search from '../../assets/images/navbar/search.svg';
import favorites from '../../assets/images/navbar/heart.svg';
import cart from '../../assets/images/navbar/cart.svg';

const Navbar = () => {
  return (
    <nav>
      <div className='nav-container'>
      <Link className="a-home nav-link" to="/"><img className="logo-furniro" src={logo} alt="Logo Furniro" /></Link>       

        <ol className="menu-list">
          <li className="nav-item li-home">
            <Link className="a-home nav-link" to="/">Home</Link>
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
          <img className="login-icon" src={login} alt="" />
          <img className="search-icon" src={search} alt="" />
          <img className="favorites-icon" src={favorites} alt="" />
          <img className="cart-icon" src={cart} alt="" />
        </div>
      </div>
    </nav>
  );    
}

export default Navbar;
