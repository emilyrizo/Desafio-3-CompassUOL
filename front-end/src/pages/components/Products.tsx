import axiosInstance from '../../services/axios.Config';
import { useEffect, useState } from 'react';
import '../../styles/products.css'
import shareIcon from '../../assets/images/products/share-icon.svg'
import compareIcon from '../../assets/images/products/compare-icon.svg'
import likeIcon from '../../assets/images/products/like-icon.svg'

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

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axiosInstance.get('/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="product-container">
      {/* <h1 className='product-title'>Our Products</h1> */}
      <ul className='product-list'>
        {products.map((product) => (
          <li className="product-card" key={product.id}>
            {/* Estrutura geral do produto */}
            <div className="product-image-wrapper">
              <a href="">
                <img src={product.image_link} alt={product.name} className="product-image" />
                {/* Exibir tags de 'Novo' e 'Desconto' */}
                {product.is_new && <span className="tag-new">New</span>}
                {product.discount_price && (
                  <span className="tag-discount">{`${product.discount_percent}%`}</span>
                )}
              </a>
            </div>

            <div className='card-description'>
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
              <button className="see-details-btn">See Details</button>
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
      {/* <button className='show-more-products-bt'>Show More</button>         */}
    </div>
  );
};

export default ProductList;








// import axiosInstance from '../../services/axios.Config';
// import { useEffect, useState } from 'react';
// import '../../styles/ourProducts.css'


// interface Product {
//   id: number;
//   name: string;
//   sku: string;
//   category_id: number;
//   description: string;
//   large_description: string;
//   price: string;
//   discount_price: string;
//   discount_percent: number;
//   is_new: boolean;
//   image_link: string;
//   other_images_link: string;
//   created_date: string;
//   updated_date: string;
// }

// const ProductList = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     axiosInstance.get('/products')
//       .then((response) => {
//         setProducts(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Erro ao buscar produtos:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   return (
//     <div className="product-container">
//       <h1 className='product-title'>Our Products</h1>
      
//       <ul className='product-list'>
//         {products.map((product) => (
//           <li className="product-card" key={product.id}>
//             <div className="product-image-wrapper">
//               <a href="">
//                 <img src={product.image_link} alt={product.name} className="product-image" />
//                 {product.is_new && <span className="tag-new">New</span>}
//                 {product.discount_price && (
//                   <span className="tag-discount">{`${product.discount_percent}%`}</span>
//                 )}
//               </a>
//             </div>
            
//             <div className='card-description'>
//               <a href="">
//                 <h2 className="product-name">{product.name}</h2>
//                 <p className="product-description">{product.description}</p>
//               </a>
              
//               <div className="product-pricing">
//                 {product.discount_price ? (
//                   <>
//                     <span className="discount-price">
//                       {`Rp ${Number(product.discount_price).toFixed(2).replace('.', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
//                     </span>
//                     <span className="original-price">
//                       {`Rp ${Number(product.price).toFixed(2).replace('.', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
//                     </span>
//                   </>
//                 ) : (
//                   <span className="regular-price">
//                     {`Rp ${Number(product.price).toFixed(2).replace('.', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
//                   </span>
//                 )}
//               </div>              
//             </div>                  
//           </li>
//         ))}
//       </ul>
//       <button className='show-more-products-bt'>Show More</button>        
//     </div>
//   );
// };

// export default ProductList;

