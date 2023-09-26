import React, { useState } from 'react';
import css from './PriceFilter.module.css';

const PriceFilter = ({ handlePriceChange, onFilterChange, carsPriceList }) => {
  // const [selectedPrice, setSelectedPrice] = useState('To $:');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const handleApplyFilter = e => {
  //   const selectedValue = e.target.value;
  //   setSelectedPrice(selectedValue);

  //   if (selectedValue !== '') {
  //     onFilterChange(parseFloat(selectedValue));
  //   } else {
  //     onFilterChange(null);
  //   }
  // };

  return (
    <div className={css.priceFilter}>
      <p className={css.pricePerHour}>Price/ 1 hour</p>
      <button
        className={css.dropbtn}
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        To $
      </button>
      <div
        className={
          isDropdownOpen
            ? `${css.dropdownContent} ${css.open}`
            : css.dropdownContent
        }
      >
        <ul className={css.listContainer}>
          {carsPriceList.map(price => {
            return <li className={css.dropdownLink}>{price}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default PriceFilter;
