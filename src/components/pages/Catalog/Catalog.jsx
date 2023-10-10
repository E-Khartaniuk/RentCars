import axios from 'axios';
import CarCard from 'components/CarCard/CarCard';
import React, { useEffect, useState } from 'react';
import css from './Catalog.module.css';
import Filter from 'components/Filter/Filter';
import PriceFilter from 'components/PriceFilter/PriceFilter';
import PriceRangeFilter from 'components/PriceRangeFilter/PriceRangeFilter';
import {
  fetchAllData,
  fetchCarsMarkList,
  fetchCarsPriceList,
} from 'components/Utils/fetchCarsData';

export default function Catalog() {
  const URL = 'https://6488eedf0e2469c038fe859b.mockapi.io/CarRent';
  const [cars, setCars] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [page, setPage] = useState(1);
  const [carsMarkList, setCarsMarkList] = useState([]);
  const [carsPriceList, setCarsPriceList] = useState([]);
  const [hideLoadMore, setHideLoadMore] = useState(false);
  const [selectedCarMark, setSelectedCarMark] = useState(null);
  const [filteredCars, setFilteredCars] = useState([]);

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
        const allCars = await fetchAllData(page);
        if (allCars.data.length === 0) {
          setHideLoadMore(true);
          return;
        }
        setCars(allCars.data);
      } catch (error) {}
    }

    fetchData(page);

    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setFavoriteCars(storedFavorites);
  }, [URL, page]);

  useEffect(() => {
    const filterCarsByMark = () => {
      if (!selectedCarMark) {
        setFilteredCars(cars);
      } else {
        const filtered = cars.filter(car => car.make === selectedCarMark);
        setFilteredCars(filtered);
      }
    };

    filterCarsByMark();
  }, [selectedCarMark, cars]);

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

  const handlePriceChange = async newSelectedPrice => {
    if (newSelectedPrice === null) return;

    if (newSelectedPrice === 'Show all') {
      try {
        const allCarResponse = await fetchAllData(page);
        const allCars = allCarResponse.data;
        setFilteredCars(allCars);
      } catch (error) {
        console.error('Error fetching all cars:', error);
      }
    } else {
      const filteredCars = cars.filter(car => {
        const rentalPrice = parseFloat(car.rentalPrice.replace('$', ''));
        return rentalPrice <= newSelectedPrice;
      });
      setFilteredCars(filteredCars);
    }
  };

  return (
    <>
      <div className={css.filterContainer}>
        <Filter
          carsMarkList={carsMarkList}
          onCarMarkSelect={setSelectedCarMark}
        ></Filter>

        <PriceFilter
          onFilterChange={handlePriceChange}
          carsPriceList={carsPriceList}
        ></PriceFilter>

        {/* <PriceRangeFilter onFilterChange={handlePriceChange}></PriceRangeFilter> */}
      </div>

      <ul className={css.catalogList}>
        {filteredCars.map(car => (
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
