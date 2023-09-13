import React from 'react';
import css from './CarModal.module.css';

export default function CarModal({ car, openModal }) {
  const adressArray = car.address.split(', ');
  const countrie = adressArray[adressArray.length - 1];
  const city = adressArray[adressArray.length - 2];
  return (
    <div className={css.backdrop}>
      <button
        onClick={() => {
          openModal();
        }}
      >
        x
      </button>
      <div className={css.carCardModal}>
        <div className={css.imageContainerModal}>
          <img src={car.img} alt="Car" className={css.imageContainer} />
        </div>
        <div className={css.carNameContainer}>
          <h4 className={css.carName}>
            {car.make} <span className={css.carModel}>{car.model}</span>,
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

        <p className={css.description}>{car.description}</p>

        <h5>Accessories and functionalities:</h5>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <h5>Rental Conditions:</h5>
        <div>
          <p>Minimum age : 25</p> <p>Valid driver’s license</p>
        </div>
        <div>
          <p className={css.conditions}>Security deposite required</p>
          <p className={css.conditions}>Mileage: {car.mileage}</p>
          <p className={css.conditions}>{car.rentalPrice}</p>
        </div>

        <button className={css.cardBtn}>Rental car</button>
      </div>
    </div>
  );
}
