import axios from 'axios';
import CarCard from 'components/CarCard/CarCard';
import React, { useEffect, useState } from 'react';
import css from './Catalog.module.css';
import Filter from 'components/Filter/Filter';
import PriceFilter from 'components/PriceFilter/PriceFilter';
import PriceRangeFilter from 'components/PriceRangeFilter/PriceRangeFilter';

export default function Catalog() {
  const URL = 'https://6488eedf0e2469c038fe859b.mockapi.io/CarRent';
  const [cars, setCars] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [page, setPage] = useState(1);
  const [carsMarkList, SetCarsMarkList] = useState([]);
  const [carsPriceList, SetCarsPriceList] = useState([]);

  const [hideLoadMore, setHideLoadMore] = useState(false);

  const fetchCarsMarkList = async () => {
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    const priceStep = 10;
    const newPrices = [];

    try {
      const cars = await axios.get(URL);

      const carsMarkForFilter = cars.data.map(make => {
        return make;
      });
      SetCarsMarkList(carsMarkForFilter);

      for (const car of cars.data) {
        const price = parseFloat(car.rentalPrice.replace('$', ''));
        if (price < minPrice) {
          minPrice = price;
        }
        if (price > maxPrice) {
          maxPrice = price;
        }
      }

      // Формируем список цен с шагом в 10 долларов
      for (let price = minPrice; price <= maxPrice; price += priceStep) {
        newPrices.push(Math.ceil(price / 10) * 10);
      }

      // Обновляем состояние carsPriceList только один раз
      SetCarsPriceList(newPrices);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchCarsMarkList();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(URL, {
          params: {
            page: page,
            limit: 8,
          },
        });
        if (response.data.length === 0) {
          setHideLoadMore(true);
          return;
        }
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setFavoriteCars(storedFavorites);
  }, [URL, page]);

  async function fetchNewData() {
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

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    fetchNewData();
  };

  const handlePriceChange = price => {
    const filteredCars = cars.filter(car => {
      const rentalPrice = parseFloat(car.rentalPrice.replace('$', ''));
      return rentalPrice <= price;
    });

    setCars(filteredCars);
  };

  return (
    <>
      <div className={css.filterContainer}>
        <Filter carsMarkList={carsMarkList}></Filter>

        <PriceFilter
          onFilterChange={handlePriceChange}
          carsPriceList={carsPriceList}
        ></PriceFilter>

        <PriceRangeFilter onFilterChange={handlePriceChange}></PriceRangeFilter>
      </div>

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
