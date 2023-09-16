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
        <button
          className={css.dropbtn}
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          Выбрать элемент
        </button>
        <div
          className={
            isDropdownOpen
              ? `${css.dropdownContent} ${css.open}`
              : css.dropdownContent
          }
        >
          <a href="#" className={css.dropdownLink}>
            Элемент 1
          </a>
          <a href="#" className={css.dropdownLink}>
            Элемент 2
          </a>
          <a href="#" className={css.dropdownLink}>
            Элемент 3
          </a>
          <a href="#" className={css.dropdownLink}>
            Элемент 1
          </a>
          <a href="#" className={css.dropdownLink}>
            Элемент 2
          </a>
          <a href="#" className={css.dropdownLink}>
            Элемент 3
          </a>
        </div>
      </div>
    </section>
  );
}
