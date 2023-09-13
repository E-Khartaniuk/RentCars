import React, { useState } from 'react';
import css from './CarCard.module.css';
import CarModal from 'components/CarModal/CarModal';

export default function CarCard({ car }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const adressArray = car.address.split(', ');
  const countrie = adressArray[adressArray.length - 1];
  const city = adressArray[adressArray.length - 2];

  const openModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <div className={css.carCard}>
        <div className={css.imageContainer}>
          <img src={car.img} alt="Car" className={css.imageContainer} />
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
