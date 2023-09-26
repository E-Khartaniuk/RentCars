import axios from 'axios';

export const fetchCarsMarkList = async () => {
  const URL = 'https://6488eedf0e2469c038fe859b.mockapi.io/CarRent';
  try {
    const cars = await axios.get(URL);

    const carsMarkForFilter = cars.data.map(make => {
      return make;
    });
    return carsMarkForFilter;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchCarsPriceList = async () => {
  const URL = 'https://6488eedf0e2469c038fe859b.mockapi.io/CarRent';
  let minPrice = Infinity;
  let maxPrice = -Infinity;
  const priceStep = 10;
  const newPrices = [];

  try {
    const cars = await axios.get(URL);

    for (const car of cars.data) {
      const price = parseFloat(car.rentalPrice.replace('$', ''));
      if (price < minPrice) {
        minPrice = price;
      }
      if (price > maxPrice) {
        maxPrice = price;
      }
    }

    for (let price = minPrice; price <= maxPrice; price += priceStep) {
      newPrices.push(Math.ceil(price / 10) * 10);
    }

    return newPrices;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
