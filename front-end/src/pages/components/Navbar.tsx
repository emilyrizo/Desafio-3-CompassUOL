import '../../styles/navbar.css';
import logo from '../../assets/images/navbar/logo-Furniro.png';
import login from '../../assets/images/navbar/login.svg';
import search from '../../assets/images/navbar/search.svg';
import favorites from '../../assets/images/navbar/heart.svg';
import cart from '../../assets/images/navbar/cart.svg';

const Navbar = () => {
  return (
    <nav>
      <div className='nav-container'>
        <img className="logo-furniro" src={logo} alt="Logo Furniro" />

        <ol className="menu-list">
          <li className="nav-item li-home"><a className="a-home nav-link" href="#">Home</a></li>
          <li className="nav-item li-shop"><a href="#" className="nav-link">Shop</a></li>
          <li className="nav-item li-about"><a href="#" className="nav-link">About</a></li>
          <li className="nav-item li-contact"><a href="#" className="nav-link">Contact</a></li>
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
