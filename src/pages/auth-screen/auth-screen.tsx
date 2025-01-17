import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/header-left/header-left';
import { Helmet } from 'react-helmet-async';
import { useRef, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
// import { AppRoute } from '../../const';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import { AppRoute } from '../../const';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../../const';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth && isSubmitted) {
      toast.success('You have successfully logged in!');
      setTimeout(() => {
        navigate(AppRoute.Main);
      }, 1500);
    }
  }, [authorizationStatus, isSubmitted, navigate]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(
        loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
      setIsSubmitted(true); //
      loginRef.current.value = '';
      passwordRef.current.value = '';
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Логин</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo></Logo>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default AuthScreen;
