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
    setSelectedMark(e.target.innerText);
    onCarMarkSelect(e.target.innerText);
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
          <ul className={css.listContainer}>
            {carsMarkList.map(car => (
              <li
                key={nanoid()}
                className={css.dropdownLink}
                onClick={handleSelectMark}
              >
                {car}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
