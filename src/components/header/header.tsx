import HeaderNav from '../header-nav/header-nav';
import HeaderLeft from '../header-left/header-left';

function Header(): JSX.Element {
  return (
    <header className="header" data-testid='header-container'>
      <div className="container">
        <div className="header__wrapper">
          <HeaderLeft />
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
