import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import RelatedProducts from "./components/RelatedProducts";
import axiosInstance from '../services/axios.Config';


const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);

  useEffect(() => {
    axiosInstance.get(`/products/${id}`)
      .then(response => {
        const product = response.data;
        setCurrentCategoryId(product.category_id);
      })
      .catch(error => console.error('Erro ao buscar categoria do produto:', error));
  }, [id]);

  return (
    <div className="product-page">
      <Navbar />
      <ProductDetails />
      <RelatedProducts currentCategoryId={currentCategoryId} />    
      <Footer />
    </div>
  );
};

export default ProductPage;


