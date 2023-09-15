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
        setCars(prevCars => [...prevCars, ...response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setFavoriteCars(storedFavorites);
  }, [page, limit]);

  const handleLoadMore = () => {
    if (limit >= cars.length) {
      console.log('limit', limit);
      console.log('cars.length', cars.length);
      setHideLoadMore(!hideLoadMore);
      return;
    }
    setPage(prevPage => prevPage + 1);
    // console.log('page', page);
    console.log('limit', limit);
    setLimit(prevLimit => prevLimit + 8);
  };

  return (
    <>
      <h2>Catalog</h2>
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
