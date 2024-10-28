import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axios.Config';
import shareIcon from '../../assets/images/products/share-icon.svg';
import compareIcon from '../../assets/images/products/compare-icon.svg';
import likeIcon from '../../assets/images/products/like-icon.svg';
import '../../styles/relatedProducts.css'

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

interface RelatedProductsProps {
  currentCategoryId: number | null;
}

const RelatedProducts = ({ currentCategoryId }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [showMoreCount, setShowMoreCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentCategoryId === null) return;
    axiosInstance.get('/products')
      .then((response) => {
        const products = response.data;
        
        const sameCategoryProducts = products.filter(
          (product: Product) => product.category_id === currentCategoryId
        );
        const additionalProducts = products.filter(
          (product: Product) => product.category_id !== currentCategoryId
        );
        const combinedProducts = [...sameCategoryProducts, ...additionalProducts];
        setRelatedProducts(combinedProducts);
        setDisplayedProducts(combinedProducts.slice(0, 4));
      })
      .catch((error) => {
        console.error('Error fetching related products.', error);
      });
  }, [currentCategoryId]);

  const handleShowMore = () => {
    if (showMoreCount === 1) {
      navigate(`/shop?category=${currentCategoryId}`);
    } else {
      setShowMoreCount(showMoreCount + 1);
      const nextProducts = relatedProducts.slice(0, displayedProducts.length + 4);
      setDisplayedProducts(nextProducts);
    }
  };

  if (displayedProducts.length === 0) return <div>No related products found.</div>;

  return (
    <div className="product-container related-container">
      <h1 className='related-title'>Related Products</h1>
      <ul className="product-list">
        {displayedProducts.map((product) => (
          <li className="product-card" key={product.id}>
            <div className="product-image-wrapper">
              <a href="">
                <img src={product.image_link} alt={product.name} className="product-image" />
                {product.is_new && <span className="tag-new">New</span>}
                {product.discount_price && (
                  <span className="tag-discount">{`${product.discount_percent}%`}</span>
                )}
              </a>
            </div>
            <div className="card-description">
              <a href="">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
              </a>
              <div className="product-pricing">
                {product.discount_price ? (
                  <>
                    <span className="discount-price">
                      {`Rp ${Number(product.discount_price).toFixed(2).replace('.', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                    </span>
                    <span className="original-price">
                      {`Rp ${Number(product.price).toFixed(2).replace('.', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                    </span>
                  </>
                ) : (
                  <span className="regular-price">
                    {`Rp ${Number(product.price).toFixed(2).replace('.', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                  </span>
                )}
              </div>
            </div>
            <div className="product-overlay">
              <Link to={`/product/${product.id}`}>
                <button className="see-details-btn">See Details</button>
              </Link>
              <div className="product-options">
                <span className="product-option">
                  <img src={shareIcon} alt="Share Icon" className="icon" /> Share
                </span>
                <span className="product-option">
                  <img src={compareIcon} alt="Compare Icon" className="icon" /> Compare
                </span>
                <span className="product-option">
                  <img src={likeIcon} alt="Like Icon" className="icon" /> Like
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className='show-more-products-bt' onClick={handleShowMore}>Show More</button>
    </div>
  );
};

export default RelatedProducts;
