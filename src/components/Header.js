import logo from '../images/logo.svg';
import React, { Fragment } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';


function Header({ email, isLoggedIn, setLoggedIn }) {
    const navigate = useNavigate();
    const location = useLocation();

    function signOut() {
        localStorage.removeItem('jwt');
        navigate('/signin');
        setLoggedIn(false);
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место" />
            <ul className="navbar__nav">
                {email && isLoggedIn ?
                    <Fragment>
                        <p className="navbar__email">{email.data.email}</p>
                        <li><button onClick={signOut} className="navbar__link navbar__button">Выйти</button></li>
                    </Fragment> :
                    <Fragment>
                        {location.pathname !== "/signup" && <li><Link to="/signup" className="navbar__link">Регистрация</Link></li>}
                        {location.pathname !== "/signin" && <li><Link to="/signin" className="navbar__link">Войти</Link></li>}
                    </Fragment>}
            </ul>
        </header >
    )
}

export default Header;




