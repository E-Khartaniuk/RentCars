import React, { useState } from 'react';
import css from './PriceRangeFilter.module.css';

const MAX_VALUE = 999999;

const PriceRangeFilter = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = e => {
    const value = e.target.value.replace(/\D/g, '');
    setMinPrice(
      formatNumberWithCommas(Math.min(parseInt(value, 10), MAX_VALUE))
    );
  };

  const handleMaxPriceChange = e => {
    const value = e.target.value.replace(/\D/g, '');
    setMaxPrice(
      formatNumberWithCommas(Math.min(parseInt(value, 10), MAX_VALUE))
    );
  };

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <div className={css.mainCont}>
      <p className={css.carMileage}>Car mileage / km</p>
      <div className={css.container}>
        <span className={css.fromText}>From </span>
        <input
          className={css.fromInput}
          type="text"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <span className={css.toText}>To </span>
        <input
          className={css.toInput}
          type="text"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
        {/* <button type="button" className={css.filterBtn}>
          Search
        </button> */}
      </div>
    </div>
  );
};

export default PriceRangeFilter;
