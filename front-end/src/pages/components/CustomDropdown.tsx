import React, { useState, useRef, useEffect } from 'react';
import '../../styles/customDropdown.css';

interface CustomDropdownProps {
  listOptions: string[];
  bgColor: string;
  menuBgColor: string;
  fontColor: string;
  hoverColor: string;
  textColor: string;
  hoverBgColor: string;
  hoverTextColor: string;
  defaultSelected?: string;
  dropdownWidth?: string;
  textAlign?: 'left' | 'center';
  isOpen?: boolean;
  onChange?: (selectedValue: string) => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  listOptions,
  bgColor,
  menuBgColor,
  fontColor,
  textColor,
  hoverBgColor,
  hoverTextColor,
  defaultSelected,
  dropdownWidth = 'auto',
  textAlign = 'left',
  onChange,
}) => {
  const [selectedItem, setSelectedItem] = useState(defaultSelected || listOptions[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);

    if (onChange) {
      onChange(item);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        className="dropdown-button"
        style={{
          backgroundColor: bgColor,
          color: fontColor,
          width: dropdownWidth,
          textAlign: textAlign,
        }}
        onClick={toggleDropdown}
      >
        {selectedItem}
      </button>

      {isOpen && (
        <ul className="dropdown-menu" style={{ backgroundColor: menuBgColor }}>
          {listOptions.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              style={{
                backgroundColor: menuBgColor,
                color: textColor,
                width: dropdownWidth,
                textAlign: textAlign,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverBgColor;
                e.currentTarget.style.color = hoverTextColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = menuBgColor;
                e.currentTarget.style.color = textColor;
              }}
              onClick={() => handleItemClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};