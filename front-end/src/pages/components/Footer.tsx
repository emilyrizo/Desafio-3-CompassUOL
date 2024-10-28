import '../../styles/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <h2 className="logo-footer">Furniro.</h2>
            <p className="subtitle-footer">400 University Drive Suite 200 Coral Gables,</p>
            <p>FL 33134 USA</p>            
          </div>

          <div className="footer-section link-footer">
            <h3>Links</h3>
            <ul className="inner-ul">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="#">About</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
          </div>
      
          <div className="footer-section help-footer">
            <h3>Help</h3>
            <ul className="inner-ul">
              <li><Link to="#">Payment Options</Link></li>
              <li><Link to="#">Returns</Link></li>
              <li><Link to="#">Privacy Policies</Link></li>
            </ul>
          </div>
      
          <div className="footer-section news-footer">
            <h3>Newsletter</h3>
            <form id='form-news' action="" method="">
              <label className='email-input' htmlFor=''>
                <input type="email" id="email" name="email" placeholder="Enter Your Email Address" required />
              </label>
              <button type="submit">SUBSCRIBE</button>
            </form>
          </div>
             
        </div>
          <div className="footer-copyright">
            <span className="divider-footer"></span>
            <span className='copyright'>©2024 furniro. All rights reverved</span>
          </div>
      </div>
    </footer>
  )
}

export default Footer