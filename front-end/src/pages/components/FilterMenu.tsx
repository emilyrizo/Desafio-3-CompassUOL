import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../services/axios.Config';
import { useNavigate } from 'react-router-dom';
import filterIcon from '../../assets/images/filter/filter-icon.svg';
import modeIcon from '../../assets/images/filter/mode-icon.svg';
import displayIcon from '../../assets/images/filter/display-icon.svg';
import { CustomDropdown } from './CustomDropdown';
import '../../styles/filterMenu.css';

interface FilterMenuProps {
  setItemsPerPage: (value: string) => void;
  setSortOrder: (value: string) => void;
}

interface Category {
  id: number;
  name: string;
  image_link: string;
}

const FilterMenu = ({ setItemsPerPage, setSortOrder }: FilterMenuProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Filter');
  const [itemsPerPage, setItemsPerPageState] = useState<number>(16);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const categoryRef = useRef<HTMLDivElement>(null);
  const showOptionsRef = useRef<HTMLDivElement>(null);
  const sortOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axiosInstance.get('/categories')
      .then((response) => {
        const orderedCategories = response.data.sort((a: Category, b: Category) => a.id - b.id);
        setCategories([{ id: 0, name: 'All Categories', image_link: '' }, ...orderedCategories]); 
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryChange = (categoryId: number, categoryName: string) => {
    setSelectedCategory(categoryName);
    setOpenDropdown(null);
    if (categoryId === 0) {
      navigate('/shop');
    } else {
      navigate(`/shop?category=${categoryId}`);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    const numberValue = Number(value);
    setItemsPerPageState(numberValue);
    setItemsPerPage(value);
    setOpenDropdown(null);
  };

  const [, setSortBy] = useState('Default');
  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setSortOrder(value);
    setOpenDropdown(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      categoryRef.current && !categoryRef.current.contains(event.target as Node) &&
      showOptionsRef.current && !showOptionsRef.current.contains(event.target as Node) &&
      sortOptionsRef.current && !sortOptionsRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-menu-container">
      <div className="filter-menu">
        <div 
          className="filter-icon" 
          onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')} 
          ref={categoryRef}
        >
          <img src={filterIcon} alt="Filter" className="filter-icon-img" />
          <span>{selectedCategory}</span>
          {openDropdown === 'category' && (
            <div className="checkbox-dropdown">
              {categories.map((category) => (
                <label key={category.id} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedCategory === category.name} 
                    onChange={() => handleCategoryChange(category.id, category.name)} 
                  />
                  {category.name}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="filter-display">
          <img className="mode-icon" src={modeIcon} alt="Mode Icon" />
          <img className="display-icon" src={displayIcon} alt="Display Icon" />
          <p className="filter-sidebar">Showing 1–{itemsPerPage} of 32 results</p>
        </div>
        <div className="show-options-container" ref={showOptionsRef}>
          <label htmlFor="items-per-page" className="show-label">Show</label>
          <div onClick={() => setOpenDropdown(openDropdown === 'show' ? null : 'show')}>
            <CustomDropdown
              listOptions={['16', '20', '24', '28', '32']}
              bgColor="#fff"
              menuBgColor="#F9F1E7"
              hoverColor="#F9F1E7"
              fontColor="#9F9F9F"
              textColor="#000"
              hoverBgColor="#B88E2F"
              hoverTextColor="#FFF"
              defaultSelected={itemsPerPage.toString()}
              dropdownWidth="5.5rem"
              textAlign="center"
              onChange={handleItemsPerPageChange}
              isOpen={openDropdown === 'show'}
            />
          </div>
        </div>
        <div className="sort-options" ref={sortOptionsRef}>
          <label htmlFor="sort-by" className="sort-by-label">Sort by</label>
          <div onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}>
            <CustomDropdown
              listOptions={['Ascending', 'Descending']}
              bgColor="#fff"
              menuBgColor="#F9F1E7"
              hoverColor="#F9F1E7"
              fontColor="#9F9F9F"
              textColor="#000"
              hoverBgColor="#B88E2F"
              hoverTextColor="#FFF"
              defaultSelected="Default"
              dropdownWidth="20rem"
              textAlign="left"
              onChange={handleSortByChange}
              isOpen={openDropdown === 'sort'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;