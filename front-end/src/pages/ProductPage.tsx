import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";


const ProductPage = () => {
  
  return (
    <div className="product-page">
      <Navbar />
      <ProductDetails />      
      <Footer />
    </div>
  );
};

export default ProductPage

