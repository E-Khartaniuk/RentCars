import React, { useState } from 'react';
import css from './PriceFilter.module.css';

const PriceFilter = ({ onFilterChange }) => {
  const [selectedPrice, setSelectedPrice] = useState(10);

  const handleApplyFilter = e => {
    setSelectedPrice(e.target.value);
    console.log(selectedPrice);
    if (selectedPrice !== '') {
      onFilterChange(parseFloat(selectedPrice));
    } else {
      onFilterChange(null);
    }
  };

  return (
    <div className={css.priceFilter}>
      <label htmlFor="priceFilter">To $:</label>
      <select
        id="priceFilter"
        value={selectedPrice}
        onChange={handleApplyFilter}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
        <option value={60}>60</option>
        <option value={80}>80</option>
        <option value={90}>90</option>
        <option value={100}>100</option>
        <option value={110}>110</option>
        <option value={120}>120</option>
        <option value={130}>130</option>
      </select>
    </div>
  );
};

export default PriceFilter;
