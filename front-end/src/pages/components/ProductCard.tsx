
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discounted = product.discount_price !== undefined && product.discount_price < product.price;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image_link} alt={product.name} className="product-image" />
      </Link>
      <div className="product-info">
        <h3>{product.name}</h3>
        {discounted && <span className="tag">Desconto</span>}
        <p className="price">
          {discounted ? (
            <>
              <span className="original-price">{product.price}</span>
              <span className="discounted-price">{product.discount_price}</span>
            </>
          ) : (
            <span>{product.price}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
