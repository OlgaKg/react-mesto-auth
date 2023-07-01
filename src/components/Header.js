import logo from '../images/logo.svg';
import React from 'react';
import { useLocation, useNavigate, Link, Routes, Route } from 'react-router-dom';


function Header({ email }) {
    const navigate = useNavigate();
    const location = useLocation();

    function singOut() {
        localStorage.removeItem('jwt');
        navigate('/singin');
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место" />
            <ul className="navbar__nav">
                {location.pathname !== "/singup" && <li><Link to="/singup" className="navbar__link">Регистрация</Link></li>}
                {location.pathname !== "/singin" && <li><Link to="/singin" className="navbar__link">Войти</Link></li>}
                <p className="navbar__email">{email}</p>
                <li><button onClick={singOut} className="navbar__link navbar__button">Выйти</button></li>
            </ul>

        </header >
    )
}

export default Header;


//или так
// return (
//     <header className="header">
//         <img className="header__logo" src={logo} alt="Логотип Место" />
//         <Routes>
//             <Route path="/sing-up" element={<Link to="/sing-up" className="navbar__link">Регистрация</Link>} />
//             <Route path="/sing-in" element={<Link to="/sing-in" className="navbar__link">Войти</Link>} />
//             <Route path="/" element={<div><p className="navba__email">{email}</p>
//             <Link to="/sing-in" onClick={singOut} className="navbar__link navbar__singOut">Выйти</Link></div>} />
//         </Routes>
//     </header>
// )

// return (
//     <header className="header">
//         <img className="header__logo" src={logo} alt="Логотип Место" />
//         <ul className="navbar__nav">
//             {location.pathname !== "/sing-up" && <li><Link to="/sing-up" className="navbar__link">Регистрация</Link></li>}
//             {location.pathname !== "/sing-in" && <li><Link to="/sing-in" className="navbar__link">Войти</Link></li>}
//             <p className="navba__email">{email}</p>
//             <li><button onClick={singOut} className="navbar__link navbar__button">Выйти</button></li>
//         </ul>

//     </header >
// )



