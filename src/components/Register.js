import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth'

function Register({ handelRegisterSubmit }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    // const navigate = useNavigate();
    // const [errorMessage, setErrorMessage] = useState("");//использовать в коде 33:47

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        const { email, password } = formValue;
        evt.preventDefault();
        handelRegisterSubmit(email, password);
    }

    return (
        <div className="auth" onSubmit={handleSubmit}>
            <p className="auth__title">Регистрация</p>
            <form className="auth__form auth__form_register">
                <input className="auth__input" id="email" name="email" type="email"
                    placeholder="Email"
                    value={formValue.email}
                    onChange={handleChange} />
                <input className="auth__input" id="password" name="password" type="password"
                    placeholder="Пароль"
                    value={formValue.password}
                    onChange={handleChange} />
                <button className="auth__btn" type="submit"
                    >
                    Зарегистрироваться
                </button>
            </form>
            <div className="auth__signin">
                <Link to="login" className="auth__link">Уже зарегистрированы? Войти</Link>
            </div>

        </div>
    )
}

export default Register;