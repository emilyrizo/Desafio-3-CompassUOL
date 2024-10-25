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
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [count, setCount] = useState<number>(1);
  
  const increase = () => setCount(count + 1);
  
  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    axiosInstance.get(`/products/${id}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);

        return axiosInstance.get(`/categories/${productData.category_id}`);
      })
      .then((categoryResponse) => {
        setCategory(categoryResponse.data); 
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
            <div className='mini-images-column'>
              <li className='mini-img-li'>
                <img className="product-image-mini" src={product.image_link} alt={product.name} />
              </li>
              <li className='mini-img-li'>
                <img className="product-image-mini" src={product.image_link} alt={product.name} />
              </li>
              <li className='mini-img-li'>
                <img className="product-image-mini" src={product.image_link} alt={product.name} />
              </li>
              <li className='mini-img-li'>
                <img className="product-image-mini" src={product.image_link} alt={product.name} />
              </li>
            </div>
            <div className='main-image-column'>
              <li className='img-li'>
                <img className="product-image" src={product.image_link} alt={product.name} />
                {product.is_new && <span className="tag-new">New</span>}
                {product.discount_price && <span className="tag-discount">{`${product.discount_percent}%`}</span>}
              </li>
            </div>
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

            <div className='rating'>
              <div className='rating-img'>
                <img src={stars} alt="Rating" />
              </div>
              <p className='review'>5 Customer Review</p>
            </div>

            <p className='large-description'>{product.large_description}</p>

            <div>
              <p className='title-menu-size'>Size</p>
              <ol className='menu-size'>
                <li>L</li>
                <li>XL</li>
                <li>XS</li>
              </ol>

              <p className='title-menu-color'>Color</p>
              <ol className='menu-color'>
                <li className='color-purple'></li>
                <li className='color-black'></li>
                <li className='color-gold'></li>
              </ol>
            </div>

            <div className='info-bts'>

              <div className="counter">
                <button className="decrease" onClick={decrease}>-</button>
                <span id="counter-value">{count}</span>
                <button className="increase" onClick={increase}>+</button>
              </div>

              <button className='add-to-cart-bt'>Add To Cart</button>
              <button className='compare'>+ Compare</button>
            </div>

            <div className="sku-category-tags">
              <ol className="details-grid">
                <li>
                  <span className="detail-name">SKU</span>
                  <span className="colon">:</span>
                  <span>{product.sku}</span>
                </li>
                <li>
                  <span className="detail-name">Category</span>
                  <span className="colon">:</span>
                  <span>{category ? category.name : 'Carregando...'}</span>
                </li>
                <li>
                  <span className="detail-name">Tags</span>
                  <span className="colon">:</span>
                  <span>Sofa, Chair, Home, Shop</span>
                </li>
                <li>
                  <span className="detail-name">Share</span>
                  <span className="colon">:</span>
                  <span className="social-icons">
                    <img src={fb} alt="Facebook" />
                    <img src={linkedin} alt="LinkedIn" />
                    <img src={twitter} alt="Twitter" />
                  </span>
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