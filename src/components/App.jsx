import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Favorites from './pages/Favorites/Favorites';
import Catalog from './pages/Catalog/Catalog';
import CarCard from './CarCard/CarCard';
import { SharedLayout } from './SharedLayout/SharedLayout';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog:carId" element={<CarCard />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
};
