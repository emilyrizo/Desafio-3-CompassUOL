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
import Description from './Description';

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
  const [mainImage, setMainImage] = useState<string>('');

  const increase = () => setCount(count + 1);
  const decrease = () => count > 1 && setCount(count - 1);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await axiosInstance.get(`/products/${id}`);
        const productData = productResponse.data;
        setProduct(productData);
        setMainImage(productData.image_link);

        const categoryResponse = await axiosInstance.get(`/categories/${productData.category_id}`);
        setCategory(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching the product or category:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const otherImages = product.other_images_link ? product.other_images_link.split(',') : [];

  const formatPrice = (price: string) =>
    `Rp ${Number(price).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

  return (
    <div className="product-details-container">
      <div className='product-details'>
        <div className='product-path'>
          <ol className="inner-ol">
            <li><Link to="/" className='home-li'>Home</Link><img src={arrow} alt="Arrow" /></li>
            <li><Link to="/shop" className='shop-li'>Shop</Link><img src={arrow} alt="Arrow" className='arrow-shop'/></li>
            <li className='name-li'>{product.name}</li>
          </ol>
        </div>
      </div>

      <div className='product-info-container'>
        <div className="product-info">
          <ol className='product-info-imgs'>
            <div className='mini-images-column'>
              <li className='mini-img-li' onClick={() => setMainImage(product.image_link)}>
                <img className="product-image-mini" src={product.image_link} alt={product.name} />
              </li>
              {otherImages.map((img, index) => (
                <li key={index} className='mini-img-li' onClick={() => setMainImage(img.trim())}>
                  <img className="product-image-mini" src={img.trim()} alt={product.name} />
                </li>
              ))}
            </div>
            <div className='main-image-column'>
              <li className='img-li'>
                <img className="prod-img-details" src={mainImage} alt={product.name} />
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
                  <span className="discount-price-info">{formatPrice(product.discount_price)}</span>
                  <span className="original-price-info">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="regular-price-info">{formatPrice(product.price)}</span>
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
                <li><span className="detail-name">SKU</span><span className="colon">:</span><span>{product.sku}</span></li>
                <li><span className="detail-name">Category</span><span className="colon">:</span><span>{category ? category.name : 'Carregando...'}</span></li>
                <li><span className="detail-name">Tags</span><span className="colon">:</span><span>Sofa, Chair, Home, Shop</span></li>
                <li>
                  <span className="detail-name">Share</span>
                  <span className="colon">:</span>
                  <span className="social-icons-span">
                    <Link to="#" className="social-icons"><img src={fb} alt="Facebook" /></Link>
                    <Link to="#" className="social-icons"><img src={linkedin} alt="LinkedIn" /></Link>
                    <Link to="#" className="social-icons"><img src={twitter} alt="Twitter" /></Link>
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Description large_description={product.large_description} />
    </div>
  );
};

export default ProductDetails;
