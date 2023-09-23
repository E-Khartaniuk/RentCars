import React, { useState } from 'react';
import css from './Filter.module.css';

export default function Filter({ carsMarkList }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

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
            isDropdownOpen ? `${css.dropdownContent} ` : css.dropdownContent
          }
        >
          <ul className={css.listContainer}>
            {carsMarkList.map(car => (
              <li>
                <a href="/RentCars/catalog" className={css.dropdownLink}>
                  {car.make}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
