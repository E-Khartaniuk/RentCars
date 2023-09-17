import sprite from '../img/sprite.svg';
import React, { useEffect } from 'react';
import css from './CarModal.module.css';

export default function CarModal({ car, openModal }) {
  const adressArray = car.address.split(', ');
  const countrie = adressArray[adressArray.length - 1];
  const city = adressArray[adressArray.length - 2];

  useEffect(() => {
    const handleEscKeyPress = event => {
      if (event.key === 'Escape') {
        openModal();
      }
    };

    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [openModal]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      openModal();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.carCardModal}>
        <button
          onClick={() => {
            openModal();
          }}
          className={css.closeBtn}
        >
          <svg className={css.closeIcon}>
            <use xlinkHref={`${sprite}#close`} />
          </svg>
        </button>
        <div className={css.imageContainerModal}>
          <img src={car.img} alt="Car" className={css.imageContainer} />
        </div>
        <div className={css.carNameContainer}>
          <h4 className={css.carName}>
            {car.make} <span className={css.carModel}>{car.model}</span>,{' '}
            {car.year}
          </h4>
        </div>
        <ul className={css.propertyContainer}>
          <li className={css.propertyItem}>{countrie}</li>
          <li className={css.propertyItem}>{city}</li>
          <li className={css.propertyItem}>id: {car.id}</li>
          <li className={css.propertyItem}>Year: {car.year}</li>
          <li className={css.propertyItem}>Type: {car.type}</li>
          <li className={css.propertyItem}>
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={css.propertyItem}>Engine Size: {car.engineSize}</li>
          {/* <li className={css.propertyItem}>{car.functionalities[0]}</li> */}
        </ul>

        <p className={css.description}>{car.description}</p>

        <h5>Accessories and functionalities:</h5>
        <div className={css.functionalitiesContainer}>
          <ul className={css.propertyContainer}>
            {car.accessories.map(accessory => (
              <li className={css.propertyItem}>{accessory}</li>
            ))}
          </ul>
          <ul className={css.propertyContainer}>
            {car.functionalities.map(functionaliti => (
              <li className={css.propertyItem}>{functionaliti}</li>
            ))}
          </ul>
        </div>

        <h5>Rental Conditions:</h5>
        <div className={css.conditionsContainer}>
          <p className={css.conditions}>
            Minimum age : <span className={css.conditionsAccent}>25</span>
          </p>
          <p className={css.conditions}>Valid driver’s license</p>
        </div>
        <div className={css.conditionsContainer}>
          <p className={css.conditions}>Security deposite required</p>
          <p className={css.conditions}>
            Mileage:{' '}
            <span className={css.conditionsAccent}>
              {car.mileage.toString().replace(/^(\d)(?=(\d{3})+$)/g, '$1,')}
            </span>
          </p>
          <p className={css.conditions}>
            price:{' '}
            <span className={css.conditionsAccent}>{car.rentalPrice}</span>
          </p>
        </div>

        <button
          className={css.cardBtn}
          onClick={() => {
            window.location.href = `tel:${'+380730000000'}`;
          }}
        >
          Rental car
        </button>
      </div>
    </div>
  );
}
