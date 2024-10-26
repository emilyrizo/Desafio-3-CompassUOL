import axiosInstance from '../../services/axios.Config';
import '../../styles/browser.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  image_link: string;
}

const Browser = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/categories')
      .then((response) => {
        const orderedCategories = response.data.sort((a: Category, b: Category) => a.id - b.id);
        setCategories(orderedCategories);
      })
      .catch((error) => {
        console.error('Erro ao buscar categorias:', error);
      });
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/shop?category=${categoryId}`);
  };

  return (
    <div className='browser-container'>
      <h1 className='browser-title'>Browse The Range</h1>
      <ul className="menu-list-browser">
        {categories.map((category) => (
          <li key={category.id} className={`li-${category.name.toLowerCase()}`}>
            <a className={`a-${category.name.toLowerCase()}`} onClick={() => handleCategoryClick(category.id)} style={{ cursor: 'pointer' }}>
              <img src={category.image_link} alt={category.name} />
              <h2>{category.name}</h2>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Browser;




// import axiosInstance from '../../services/axios.Config';
// import '../../styles/browser.css';
// import { useEffect, useState } from 'react';

// interface Category {
//   id: number;
//   name: string;
//   image_link: string;
// }

// const Browser = () => {
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     axiosInstance.get('/categories')
//       .then((response) => {
//         const orderedCategories = response.data.sort((a: Category, b: Category) => a.id - b.id);
//         setCategories(orderedCategories);
//       })
//       .catch((error) => {
//         console.error('Erro ao buscar categorias:', error);
//       });
//   }, []);

//   return (
//     <div className='browser-container'>
//       <h1 className='browser-title'>Browse The Range</h1>
//       <ul className="menu-list-browser">
//         {categories.map((category) => (
//           <li key={category.id} className={`li-${category.name.toLowerCase()}`}>
//             <a className={`a-${category.name.toLowerCase()}`} href="#">
//               <img src={category.image_link} alt={category.name} />
//               <h2>{category.name}</h2>
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Browser;
