import CarCard from 'components/CarCard/CarCard';
import Filter from 'components/Filter/Filter';
import PriceFilter from 'components/PriceFilter/PriceFilter';
import PriceRangeFilter from 'components/PriceRangeFilter/PriceRangeFilter';
import React, { useEffect, useState } from 'react';
import css from '../Catalog/Catalog.module.css';
import axios from 'axios';

export default function Favorites() {
  const URL = 'https://6488eedf0e2469c038fe859b.mockapi.io/CarRent';
  const [cars, setCars] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [hideLoadMore, setHideLoadMore] = useState(false);

  useEffect(() => {
    const favoriteCarsFromLs =
      JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setFavoriteCars(favoriteCarsFromLs);

    async function fetchData() {
      try {
        const response = await axios.get(URL, {
          params: {
            page: page,
            limit: 8,
          },
        });
        setCars(prevCars => [...prevCars, ...response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [URL, page, limit]);

  const handlePriceChange = price => {
    console.log('price', price);
    const filteredCars = cars.filter(car => {
      const rentalPrice = parseFloat(car.rentalPrice.replace('$', ''));
      return rentalPrice <= price;
    });
    console.log('filteredCars', filteredCars);
    setCars(filteredCars);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <div className={css.filterContainer}>
        <Filter />
        <PriceFilter onFilterChange={handlePriceChange} />
        <PriceRangeFilter onFilterChange={handlePriceChange} />
      </div>
      <ul className={css.catalogList}>
        {favoriteCars.map(car => (
          <li key={car.id}>
            <CarCard
              car={car}
              favoriteCars={favoriteCars}
              setFavoriteCars={setFavoriteCars}
            />
          </li>
        ))}
      </ul>
      {!hideLoadMore && favoriteCars.length > 0 ? (
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
