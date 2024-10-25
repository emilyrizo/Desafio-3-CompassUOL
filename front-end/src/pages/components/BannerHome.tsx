import '../../styles/banner.css';
import banner from '../../assets/images/banner/banner.png';

const BannerHome = () => {
  return (
    <div className='banner-home'>
      <img className='banner-home-img' src={banner} alt="" />
    </div>
  )
}

export default BannerHome