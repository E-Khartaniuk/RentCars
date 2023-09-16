import axios from 'axios';
import CarCard from 'components/CarCard/CarCard';
import React, { useEffect, useState } from 'react';
import css from './Catalog.module.css';

export default function Catalog() {
  const URL = 'https://6488eedf0e2469c038fe859b.mockapi.io/CarRent';
  const [cars, setCars] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [hideLoadMore, setHideLoadMore] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(URL, {
          params: {
            page: page,
            limit: limit,
          },
        });
        if (response.data.length === 0) {
          setHideLoadMore(true);
          return;
        }
        // setCars(prevCars => [...prevCars, ...response.data]);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setFavoriteCars(storedFavorites);
  }, []);

  async function fetchNewData() {
    try {
      const response = await axios.get(URL, {
        params: {
          page: page,
          limit: limit,
        },
      });
      setCars(prevCars => [...prevCars, ...response.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);

    fetchNewData();
  };

  const handlePriceChange = () => {
    const filteredCars = cars.filter(car => {
      const rentalPrice = parseFloat(car.rentalPrice.replace('$', ''));
      return rentalPrice <= 40;
    });
    console.log('filteredCars', filteredCars);
    setCars(filteredCars);
  };

  return (
    <>
      <h2>Catalog</h2>
      <button type="button" onClick={handlePriceChange}>
        60
      </button>
      <ul className={css.catalogList}>
        {cars.map(car => (
          <li key={car.id}>
            <CarCard
              car={car}
              favoriteCars={favoriteCars}
              setFavoriteCars={setFavoriteCars}
            />
          </li>
        ))}
      </ul>
      {!hideLoadMore ? (
        <button
          type="button"
          onClick={handleLoadMore}
          className={css.loadMoreBtn}
        >
          Load more
        </button>
      ) : (
        ''
      )}
    </>
  );
}
