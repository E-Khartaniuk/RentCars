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
      {/* <select
        value={selectedPrice}
        onChange={handleApplyFilter}
        style={{ height: '48px' }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
        <option value={60}>60</option>
        <option value={70}>70</option>
        <option value={80}>80</option>
        <option value={90}>90</option>
        <option value={100}>100</option>
        <option value={110}>110</option>
        <option value={120}>120</option>
        <option value={130}>130</option>
        <option value={140}>140</option>
        <option value={150}>150</option>
        <option value={160}>160</option>
        <option value={170}>170</option>
        <option value={180}>180</option>
        <option value={190}>190</option>
        <option value={200}>200</option>
        <option value={210}>210</option>
        <option value={220}>220</option>
        <option value={230}>230</option>
        <option value={240}>240</option>
        <option value={250}>250</option>
        <option value={260}>260</option>
        <option value={270}>270</option>
        <option value={280}>280</option>
      </select> */}
    </div>
  );
};

export default PriceFilter;
