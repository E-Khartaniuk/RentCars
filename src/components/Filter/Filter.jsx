import React, { useState } from 'react';
import css from './Filter.module.css';
import { nanoid } from 'nanoid';

export default function Filter({ carsMarkList, onCarMarkSelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMark, setSelectedMark] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectMark = e => {
    e.preventDefault();
    setSelectedMark(e.target.innerText);
    onCarMarkSelect(selectedMark);
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
          {selectedMark ? selectedMark : 'Select car brand'}
        </button>
        <div
          className={
            isDropdownOpen ? `${css.dropdownContent} ` : css.dropdownContent
          }
        >
          <ul className={css.listContainer} onClick={handleSelectMark}>
            {carsMarkList.map(car => (
              <li key={nanoid()}>
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
