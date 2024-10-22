import quality from '../../assets/images/info-bar/quality.svg'
import check from '../../assets/images/info-bar/check.svg'
import shipping from '../../assets/images/info-bar/shipping.svg'
import support from '../../assets/images/info-bar/support.svg'
import '../../styles/infobar.css'

const InfoBar = () => {
  return (
    <div className='infobar-container'>
      <ol className='infobar-list'>
        <li>
          <img src={quality} alt="" />
          <span>
            <h3>Hight Quality</h3>
            <p>crafted from top materials</p>
          </span>
        </li>
        <li>
          <img src={check} alt="" />
          <span>
            <h3>Warranty Protection</h3>
            <p>Over 2 years</p>
          </span>
        </li>
        <li>
          <img src={shipping} alt="" />
          <span>
            <h3>Free Shipping</h3>
            <p>Order over 150 $</p>
          </span>
        </li>
        <li>
          <img src={support} alt="" />
          <span>
            <h3>24 / 7 Support</h3>
            <p>Dedicated support</p>
          </span>
        </li>
      </ol>
    </div>
  )
}

export default InfoBar