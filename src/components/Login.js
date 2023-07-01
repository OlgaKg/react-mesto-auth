import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth'

function Login({ handleLogin }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();
    // const [errorMessage, setErrorMessage] = useState("");//использовать в коде 33:47, popup

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        auth.loginUser(formValue.email, formValue.password).then((data) => {
            localStorage.setItem('jwt', data.jwt);  
            handleLogin();
            navigate('/');
        }).catch((err) => { console.log(err) }); //тут попап
        
    }

    return (
        <div className="auth">
            <p className="auth__title">Вход</p>
            <form className="auth__form auth__form_login">
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
                    Войти
                </button>
            </form>

        </div>
    )
}

export default Login;