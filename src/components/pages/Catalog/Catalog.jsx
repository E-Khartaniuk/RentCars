import axios from 'axios';
import CarCard from 'components/CarCard/CarCard';
import React, { useEffect, useState } from 'react';
import css from './Catalog.module.css';
import Filter from 'components/Filter/Filter';
import PriceFilter from 'components/PriceFilter/PriceFilter';
import PriceRangeFilter from 'components/PriceRangeFilter/PriceRangeFilter';
import {
  fetchCarsMarkList,
  fetchCarsPriceList,
} from 'components/Utils/fetchCarsData';
import { nanoid } from 'nanoid';

export default function Catalog() {
  const URL = 'https://6488eedf0e2469c038fe859b.mockapi.io/CarRent';
  const [cars, setCars] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [page, setPage] = useState(1);
  const [carsMarkList, setCarsMarkList] = useState([]);
  const [carsPriceList, setCarsPriceList] = useState([]);
  const [hideLoadMore, setHideLoadMore] = useState(false);
  // const [selectedCarMark, setSelectedCarMark] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const markList = await fetchCarsMarkList();
        setCarsMarkList(markList);

        const priceList = await fetchCarsPriceList();
        setCarsPriceList(priceList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
      // setCars(response.data);
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
    console.log('price', price);
    if (price === null) return;
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
          <li
            key={car.id}
            // key={nanoid()}
          >
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
