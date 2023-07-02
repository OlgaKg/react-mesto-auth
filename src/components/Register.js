import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegisterSubmit }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

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
        handleRegisterSubmit(email, password);
    }

    return (
        <div className="auth">
            <p className="auth__title">Регистрация</p>
            <form className="auth__form auth__form_register" onSubmit={handleSubmit}>
                <input className="auth__input" id="email" name="email" type="email"
                    placeholder="Email"
                    value={formValue.email}
                    onChange={handleChange} />
                <input className="auth__input" id="password" name="password" type="password"
                    placeholder="Пароль"
                    value={formValue.password}
                    onChange={handleChange} />
                <button className="auth__btn" type="submit"
                    onSubmit={handleSubmit}>
                    Зарегистрироваться
                </button>
            </form>
            <div className="auth__signin">
                <Link to="/signin" className="auth__link">Уже зарегистрированы? Войти</Link>
            </div>

        </div>
    )
}

export default Register;