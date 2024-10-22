import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Browser from './components/Browser';
import OurProducts from './components/OurProducts';
import InfoBar from './components/InfoBar';
import Footer from './components/footer';

const Home = () => {
    return (
        <div className="home-container">
          <Navbar />
          <Banner />
          <Browser />
          <OurProducts />
          <InfoBar />
          <Footer />        
        </div>
    );
};

export default Home;
