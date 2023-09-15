import React, { useState } from 'react';
import css from './CarCard.module.css';
import CarModal from 'components/CarModal/CarModal';
import sprite from '../img/sprite.svg';

export default function CarCard({ car, setFavoriteCars, favoriteCars }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [favorite, setFavorite] = useState(false);
  const isFavorite = favoriteCars.some(favCar => favCar.id === car.id);

  const adressArray = car.address.split(', ');
  const countrie = adressArray[adressArray.length - 1];
  const city = adressArray[adressArray.length - 2];

  const openModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleFavoriteToggle = () => {
    const updatedFavorites = isFavorite
      ? favoriteCars.filter(favCar => favCar.id !== car.id)
      : [...favoriteCars, car];

    setFavoriteCars(updatedFavorites);
    localStorage.setItem('favoriteCars', JSON.stringify(updatedFavorites));
  };
  return (
    <>
      <div className={css.carCard}>
        <div className={css.imageContainer}>
          <img src={car.img} alt="Car" className={css.imageContainer} />
          <button
            type="button"
            onClick={handleFavoriteToggle}
            className={css.favBtn}
          >
            <svg
              className={
                isFavorite ? css.favoriteIconChecked : css.favoriteIcon
              }
            >
              <use xlinkHref={`${sprite}#favorite`} />
            </svg>
          </button>
        </div>
        <div className={css.carNameContainer}>
          <h4 className={css.carName}>
            {car.make} <span className={css.carModel}>{car.model}</span>,{' '}
            <span className={css.carYear}>{car.year}</span>
          </h4>
          <span>{car.rentalPrice}</span>
        </div>
        <ul className={css.propertyContainer}>
          <li className={css.propertyItem}>{countrie}</li>
          <li className={css.propertyItem}>{city}</li>
          <li className={css.propertyItem}>{car.rentalCompany}</li>
          <li className={css.propertyItem}>{car.type}</li>
          <li className={css.propertyItem}>{car.model}</li>
          <li className={css.propertyItem}>{car.mileage}</li>
          <li className={css.propertyItem}>{car.functionalities[0]}</li>
        </ul>
        <button className={css.cardBtn} onClick={openModal}>
          Learn more
        </button>
      </div>
      {modalIsOpen ? <CarModal car={car} openModal={openModal} /> : ''}
    </>
  );
}
