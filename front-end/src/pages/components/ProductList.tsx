import axiosInstance from '../../services/axios.Config';
import { useEffect, useState } from 'react';
import '../../styles/productList.css';
import Pagination from './Pagination';


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
}

const ProductList: React.FC<ProductListProps> = ({ itemsPerPage }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    axiosInstance.get('/products')
      .then((response) => {
        const fetchedProducts = response.data;
        const repeatedProducts = [];
        for (let i = 0; i < Math.max(itemsPerPage, 16); i++) {
          repeatedProducts.push(fetchedProducts[i % fetchedProducts.length]);
        }

        setProducts(repeatedProducts);
        setTotalPages(Math.ceil(repeatedProducts.length / itemsPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      });
  }, [itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="shop-product-container">
      <ul className="shop-product-list">
        {paginatedProducts.map((product) => (
          <li className="product-card" key={product.id}>
            <a href="">
              <img src={product.image_link} alt={product.name} className="product-image" />
            </a>
            <div className="card-description">
              <a href="">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
              </a>
              <div className="product-pricing">
                {product.discount_price ? (
                  <>
                    <span className="discount-price">
                      {`Rp ${Number(product.discount_price).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                    </span>
                    <span className="original-price">
                      {`Rp ${Number(product.price).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                    </span>
                  </>
                ) : (
                  <span className="regular-price">
                    {`Rp ${Number(product.price).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;






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

// interface ProductListProps {
//   itemsPerPage: number;
// }

// const ProductList = ({ itemsPerPage }: ProductListProps) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalProducts, setTotalProducts] = useState<number>(0);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const itemsPerPage = 8;

//   useEffect(() => {
//     axiosInstance.get('/products')
//       .then((response) => {
//         const fetchedProducts = response.data;
//         setProducts(fetchedProducts);
//         setTotalProducts(fetchedProducts.length);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Erro ao buscar produtos:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="shop-product-container">
//       <ul className="shop-product-list">
//         {paginatedProducts.map((product) => (
//           <li className="product-card" key={product.id}>
//             <a href="">
//               <img src={product.image_link} alt={product.name} className="product-image" />
//             </a>
//             <div className="card-description">
//               <a href="">
//                 <h2 className="product-name">{product.name}</h2>
//                 <p className="product-description">{product.description}</p>
//               </a>
//               <div className="product-pricing">
//                 {product.discount_price ? (
//                   <>
//                     <span className="discount-price">
//                       {`Rp ${Number(product.discount_price).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
//                     </span>
//                     <span className="original-price">
//                       {`Rp ${Number(product.price).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
//                     </span>
//                   </>
//                 ) : (
//                   <span className="regular-price">
//                     {`Rp ${Number(product.price).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;

//   return (
//     <div className="shop-product-container">
//       <ul className="shop-product-list">
//         {paginatedProducts.map((product) => (
//           <li className="product-card" key={product.id}>
//             <a href="">
//               <img src={product.image_link} alt={product.name} className="product-image" />
//             </a>
//             <div className="card-description">
//               <a href="">
//                 <h2 className="product-name">{product.name}</h2>
//                 <p className="product-description">{product.description}</p>
//               </a>
//               <div className="product-pricing">
//                 {product.discount_price ? (
//                   <>
//                     <span className="discount-price">
//                       {`Rp ${Number(product.discount_price).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
//                     </span>
//                     <span className="original-price">
//                       {`Rp ${Number(product.price).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
//                     </span>
//                   </>
//                 ) : (
//                   <span className="regular-price">
//                     {`Rp ${Number(product.price).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default ProductList;