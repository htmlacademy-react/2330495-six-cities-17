import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { RootState } from '../../types/state';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';

function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  const authorizationStatus = useAuthorizationStatus();

  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const favorites = useAppSelector((state) => state.favorites);
  const countFavoritesPlaces = favorites.length;

  if (authorizationStatus === AuthorizationStatus.Auth && user) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to="/favorites"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">{user.email}</span>
              <span className="header__favorite-count">
                {countFavoritesPlaces}
              </span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link className="header__nav-link" to="/">
              <span className="header__signout" onClick={handleLogout}>
                Sign out
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to="/login"
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
