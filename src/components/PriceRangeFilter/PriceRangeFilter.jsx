import React, { useState } from 'react';

const PriceRangeFilter = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = e => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = e => {
    setMaxPrice(e.target.value);
  };

  const handleApplyFilter = () => {
    if (minPrice !== '' && maxPrice !== '') {
      console.log(minPrice, maxPrice);
      onFilterChange({
        minPrice: parseFloat(minPrice),
        maxPrice: parseFloat(maxPrice),
      });
    } else {
      onFilterChange(null);
    }
  };

  return (
    <div>
      <label htmlFor="minPrice">From:</label>
      <input
        type="number"
        id="minPrice"
        value={minPrice}
        onChange={handleMinPriceChange}
      />
      <label htmlFor="maxPrice">To:</label>
      <input
        type="number"
        id="maxPrice"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
      <button onClick={handleApplyFilter}>Apply</button>
    </div>
  );
};

export default PriceRangeFilter;
