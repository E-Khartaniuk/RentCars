import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={css.homePageBG}>
      <div className={css.container}>
        <h1 className={css.title}>Ukraine Car Rentals</h1>
        <p className={css.description}>
          Discover the Beauty of Ukraine with Our Car Rental Services. Explore
          Cities, Mountains, and Coastlines at Your Own Pace. Book Your Rental
          Car Today!
        </p>
      </div>
      <Link to="/catalog" className={css.catalogBtn}>
        {' '}
        Go on your dream trip!
      </Link>
    </main>
  );
}
