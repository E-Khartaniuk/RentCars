import React, { useState } from 'react';
import css from './Filter.module.css';

export default function Filter() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <section>
      <div className={css.dropdown}>
        <p className={css.carBrand}>Car brand</p>
        <button
          className={css.dropbtn}
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          Select car brand
        </button>
        <div
          className={
            isDropdownOpen
              ? `${css.dropdownContent} ${css.open}`
              : css.dropdownContent
          }
        >
          <div className={css.listContainer}>
            <a href="/RentCars/catalog" className={css.dropdownLink}>
              Buick
            </a>
            <a href="/RentCars/catalog" className={css.dropdownLink}>
              Volvo
            </a>
            <a href="/RentCars/catalog" className={css.dropdownLink}>
              Hummer
            </a>
            <a href="/RentCars/catalog" className={css.dropdownLink}>
              Subaru
            </a>
            <a href="/RentCars/catalog" className={css.dropdownLink}>
              Mitsubishi
            </a>
            <a href="/RentCars/catalog" className={css.dropdownLink}>
              Nissan
            </a>
            <a href="/RentCars/catalog" className={css.dropdownLink}>
              Lincoln
            </a>
            <a href="/RentCars/catalog" className={css.dropdownLink}>
              GMC
            </a>
            <a href="/RentCars/catalog" className={css.dropdownLink}>
              Hyundai
            </a>
            <a href="/RentCars/catalog" className={css.dropdownLink}>
              Subaru
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
