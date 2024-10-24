import { useState, useEffect, useRef } from 'react';
import filterIcon from '../../assets/images/filter/filter-icon.svg';
import modeIcon from '../../assets/images/filter/mode-icon.svg';
import displayIcon from '../../assets/images/filter/display-icon.svg';
import { CustomDropdown } from './CustomDropdown';
import '../../styles/filterMenu.css';

interface FilterMenuProps {
  setItemsPerPage: (value: string) => void;
}

const FilterMenu = ({ setItemsPerPage }: FilterMenuProps) => {
  const categories = ['Dining', 'Living', 'Bedroom'];
  const itemsOptions = ['16', '20', '24', '28', '32'];
  const sortOptions = ['Ascending', 'Descending'];

  const [selectedCategory, setSelectedCategory] = useState<string>('Filter');
  const [itemsPerPage, setItemsPerPageState] = useState<string>('16');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setOpenDropdown(null);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPageState(value); 
    setItemsPerPage(value);
    setOpenDropdown(null);
  };

  const [, setSortBy] = useState('Default');
  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setOpenDropdown(null);
  };

  const categoryRef = useRef<HTMLDivElement>(null);
  const showOptionsRef = useRef<HTMLDivElement>(null);
  const sortOptionsRef = useRef<HTMLDivElement>(null);

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
        <div className="filter-icon" onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')} ref={categoryRef}>
          <img 
            src={filterIcon} 
            alt="Filter" 
            className="filter-icon-img" 
          />
          <span>{selectedCategory}</span> {/* Mostra a categoria selecionada */}
          {openDropdown === 'category' && (
            <div className="checkbox-dropdown">
              {categories.map(category => (
                <label key={category} className="checkbox-label" onClick={() => handleCategoryChange(category)}>
                  <input
                    type="checkbox"
                    checked={selectedCategory === category} 
                    onChange={() => handleCategoryChange(category)} 
                  />
                  {category}
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
              listOptions={itemsOptions}
              bgColor="#fff"
              menuBgColor="#F9F1E7"
              hoverColor="#F9F1E7"
              fontColor="#9F9F9F"
              textColor="#000"
              hoverBgColor="#B88E2F"
              hoverTextColor="#FFF"
              defaultSelected={itemsPerPage} 
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
              listOptions={sortOptions}
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
