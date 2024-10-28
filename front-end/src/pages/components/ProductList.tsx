import axiosInstance from '../../services/axios.Config';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/productList.css';
import shareIcon from '../../assets/images/products/share-icon.svg';
import compareIcon from '../../assets/images/products/compare-icon.svg';
import likeIcon from '../../assets/images/products/like-icon.svg';

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

interface ProductListProps {
  itemsPerPage: number;
  currentPage: number;
  sortOrder: string;
}

const ProductList = ({ itemsPerPage, currentPage, sortOrder }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!products) {
    return <div>Product not found.</div>;
  }
  
  const searchParams = new URLSearchParams(location.search);
  const selectedCategoryId = searchParams.get('category');

  const filteredProducts = selectedCategoryId
    ? products.filter((product) => product.category_id === Number(selectedCategoryId))
    : products;

  const sortedProducts = filteredProducts.sort((a, b) => {
    const priceA = parseFloat(a.discount_price || a.price);
    const priceB = parseFloat(b.discount_price || b.price);
    return sortOrder === 'Ascending' ? priceA - priceB : priceB - priceA;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedProducts = sortedProducts.slice(startIndex, endIndex);

  while (displayedProducts.length < itemsPerPage) {
    displayedProducts.push(...sortedProducts.slice(0, itemsPerPage - displayedProducts.length));
  }

  return (
    <div className="product-container">
      <ul className="product-list">
        {displayedProducts.map((product, index) => (
          <li className="product-card" key={`${product.id}-${index}`}>
            <div className="product-image-wrapper">
              <Link to={`/product/${product.id}`}>
                <img src={product.image_link} alt={product.name} className="product-image" />
                {product.is_new && <span className="tag-new">New</span>}
                {product.discount_price && (
                  <span className="tag-discount">{`${product.discount_percent}%`}</span>
                )}
              </Link>
            </div>
            <div className="card-description">
              <Link to={`/product/${product.id}`}>
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
              </Link>
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
    </div>
  );
};

export default ProductList;