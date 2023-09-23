import axios from 'axios';

export const fetchCarsMarkList = async () => {
  const URL = 'https://6488eedf0e2469c038fe859b.mockapi.io/CarRent';
  try {
    const response = await axios.get(URL);

    const carsMarkForFilter = response.data.map(make => {
      return make;
    });

    return carsMarkForFilter;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
