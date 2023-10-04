import React, { useState } from 'react';
import css from './PriceFilter.module.css';
import { nanoid } from 'nanoid';

const PriceFilter = ({ handlePriceChange, onFilterChange, carsPriceList }) => {
  // const [selectedPrice, setSelectedPrice] = useState('To $:');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectMark = e => {
    e.preventDefault();

    if (e.target.nodeName === 'UL') return;

    setSelectedPrice(e.target.innerText);
    onFilterChange(e.target.innerText);
  };

  return (
    <div className={css.priceFilter}>
      <p className={css.pricePerHour}>Price/ 1 hour</p>
      <button
        className={css.dropbtn}
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        To $ {selectedPrice ? selectedPrice : ''}
      </button>
      <div
        className={
          isDropdownOpen
            ? `${css.dropdownContent} ${css.open}`
            : css.dropdownContent
        }
      >
        <ul className={css.listContainer} onClick={handleSelectMark}>
          {carsPriceList.map(price => {
            return (
              <li key={nanoid()} className={css.dropdownLink}>
                {price}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PriceFilter;
