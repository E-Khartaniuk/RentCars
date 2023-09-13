import axios from 'axios';
import CarCard from 'components/CarCard/CarCard';
import React, { useEffect, useState } from 'react';
import css from './Catalog.module.css';

export default function Catalog() {
  const URL = 'https://6488eedf0e2469c038fe859b.mockapi.io/CarRent';
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(URL);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h2>Catalog</h2>
      <ul className={css.catalogList}>
        {cars.map(car => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>
    </>
  );
}
