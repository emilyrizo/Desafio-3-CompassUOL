import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { Product } from '../types/Product';
import { Category } from '../types/Category';


const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts(); 
        setProducts(productsData); 
        const categoriesData = await getCategories(); 
        setCategories(categoriesData); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map(product => (
        <div key={product.id}>{product.name}</div> 
      ))}
      <h1>Categories</h1>
      {categories.map(category => (
        <div key={category.id}>{category.name}</div> 
      ))}
    </div>
  );
};

export default ProductPage;
