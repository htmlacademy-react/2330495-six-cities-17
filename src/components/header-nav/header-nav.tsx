import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
// import { clearUser } from '../../store/action';
import { AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { RootState } from '../../types/state';

function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const authorizationStatus = useAppSelector(
    (state: RootState) => state.authorizationStatus
  );

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  if (authorizationStatus === AuthorizationStatus.Auth && user) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to="#">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">{user.email}</span>
              <span className="header__favorite-count">3</span>
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
