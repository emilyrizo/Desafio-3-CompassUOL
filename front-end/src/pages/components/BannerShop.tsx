import bannershop from '../../assets/images/banner/banner-shop.png'
import '../../styles/banner.css';

const BannerShop = () => {
  return (
    <div className='banner-shop'>
      <img className='banner-shop-img' src={bannershop} alt="" />
    </div>
  )
}

export default BannerShop