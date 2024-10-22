import { useEffect, useState } from 'react';
import { getCategories } from '../services/categoryService';
import { Category } from '../types/Category';


const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories(); 
        setCategories(categoriesData); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      {categories.map(category => (
        <div key={category.id}>{category.name}</div> 
      ))}
    </div>
  );
};

export default CategoryPage;
