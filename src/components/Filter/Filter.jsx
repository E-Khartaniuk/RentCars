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
            <button href="#" className={css.dropdownLink}>
              Buick
            </button>
            <button href="#" className={css.dropdownLink}>
              Volvo
            </button>
            <button href="#" className={css.dropdownLink}>
              Hummer
            </button>
            <button href="#" className={css.dropdownLink}>
              Subaru
            </button>
            <button href="#" className={css.dropdownLink}>
              Mitsubishi
            </button>
            <button href="#" className={css.dropdownLink}>
              Nissan
            </button>
            <button href="#" className={css.dropdownLink}>
              Lincoln
            </button>
            <button href="#" className={css.dropdownLink}>
              GMC
            </button>
            <button href="#" className={css.dropdownLink}>
              Hyundai
            </button>
            <button href="#" className={css.dropdownLink}>
              Subaru
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
