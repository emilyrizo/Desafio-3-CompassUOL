import '../../styles/footer.css';

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
              <li>Home</li>
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
      
          <div className="footer-section help-footer">
            <h3>Help</h3>
            <ul className="inner-ul">
              <li>Payment Options</li>
              <li>Returns</li>
              <li>Privacy Policies</li>
            </ul>
          </div>
      
          <div className="footer-section news-footer">
            <h3>Newsletter</h3>
            <form action="" method="post">
              <label className='email-input' htmlFor='email'>
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