import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axios.Config';
import arrow from '../../assets/images/product-page/arrow.svg';
import stars from '../../assets/images/product-page/stars.svg';
import fb from '../../assets/images/product-page/facebook.svg';
import linkedin from '../../assets/images/product-page/linkedin.svg';
import twitter from '../../assets/images/product-page/twitter.svg';
import '../../styles/productDetails.css';

interface Product {
  id: number;
  name: string;
  sku: string;
  category_id: number;
  description: string;
  large_description: string;
  price: string;
  discount_price: string;
  discount_percent: number;
  is_new: boolean;
  image_link: string;
  other_images_link: string;
  created_date: string;
  updated_date: string;
}

interface Category {
  id: number;
  name: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null); // Estado para a categoria
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Busca o produto pelo ID
    axiosInstance.get(`/products/${id}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);

        // Busca a categoria usando category_id do produto
        return axiosInstance.get(`/categories/${productData.category_id}`);
      })
      .then((categoryResponse) => {
        setCategory(categoryResponse.data); // Salva a categoria
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar o produto ou a categoria:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className="product-details-container">
      <div className='product-details'>
        <div className='product-path'>
          <ol className="inner-ol">
            <li><Link to="/" className='home-li'>Home</Link><img src={arrow} alt="" /></li>
            <li><Link to="/shop" className='shop-li'>Shop</Link><img src={arrow} alt="" className='arrow-shop'/></li>
            <li className='name-li'>{product.name}</li>
          </ol>
        </div>
      </div>

      <div className='product-info-container'>
        <div className="product-info">
          <ol className='product-info-imgs'>
            <li className='mini-img'><img src={product.image_link} alt={product.name} /></li>
            <li className='mini-img'><img src={product.image_link} alt={product.name} /></li>
            <li className='mini-img'><img src={product.image_link} alt={product.name} /></li>
            <li className='mini-img'><img src={product.image_link} alt={product.name} /></li>
            <li className='main-img'><img src={product.image_link} alt={product.name} /></li>
          </ol>

          <div className="product-info-content">
            <h1 className='prod-name'>{product.name}</h1>
          
            <div className="product-pricing">
              {product.discount_price ? (
                <>
                  <span className="discount-price-info">
                    {`Rp ${Number(product.discount_price).toFixed(2).replace('.', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                  </span>
                  <span className="original-price-info">
                    {`Rp ${Number(product.price).toFixed(2).replace('.', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                  </span>
                </>
              ) : (
                <span className="regular-price-info">
                  {`Rp ${Number(product.price).toFixed(2).replace('.', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                </span>
              )}
            </div>

            <div>
              <img src={stars} alt="Rating" />
              <p className='review'>5 Customer Review</p>
            </div>

            <p className='large-description'>{product.large_description}</p>

            <div>
              <p className='menu-size'>Size</p>
              <ol>
                <li>L</li>
                <li>XL</li>
                <li>XS</li>
              </ol>

              <p className='menu-color'>Color</p>
              <ol>
                <li></li>
                <li></li>
                <li></li>
              </ol>
            </div>

            <div className='info-bts'>
              <span>contador</span>
              <button>Add To Cart</button>
              <button>+ Compare</button>
            </div>

            <div className="sku-category-tags">
              <ol>
                <li>SKU<span>:</span>{product.sku}</li>
                <li>Category<span>:</span>{category ? category.name : 'Carregando...'}</li>
                <li>Tags<span>:</span>Sofa, Chair, Home, Shop</li>
                <li>Share<span>:</span>
                  <img src={fb} alt="Facebook" />
                  <img src={linkedin} alt="LinkedIn" />  
                  <img src={twitter} alt="Twitter" />
                </li>
              </ol>
            </div> 
          </div>      
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
