import { NavLink, Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <div className={css.container}>
      <header>
        <nav className={css.navLinksList}>
          <div className={css.linksContainer}>
            <NavLink to="/" className={css.navigationLinks}>
              Home
            </NavLink>
            <NavLink to="/catalog" className={css.navigationLinks}>
              Catalog
            </NavLink>
            <NavLink to="/favorites" className={css.navigationLinks}>
              Favorites
            </NavLink>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
