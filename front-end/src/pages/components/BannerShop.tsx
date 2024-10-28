import '../../styles/banner.css';
import arrowBanner from '../../assets/images/product-page/arrow.svg'

const BannerShop = () => {
  return (
    <div className='banner-shop'>
      <div className='banner-shop-content'>
        <h1>Shop</h1>
        <nav>
          <ul className='text-banner-shop'>
            <li className='banner-shop-li'>Home</li>
            <li className='arrow-banner-shop'><img src={arrowBanner} alt="" /></li>
            <li className='banner-shop-li'>Shop</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BannerShop