import React from 'react';
import { AppContext } from '../contexts/AppContext';

function PopupWithForm({ name, title, isOpen, nameBtnSave, children, onSubmit }) {
const appContext=React.useContext(AppContext);

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__closed-btn" type="button" onClick={appContext.closeAllPopups} />
                <h3 className="popup__title">{title}</h3>
                <form className={`popup__form popup__form_${name}`} action="/" name={name} onSubmit={onSubmit} >
                    {children}
                    <button className="popup__save-btn" type="submit">{appContext.isLoading? 'Сохранение...' : 'Сохранить' || nameBtnSave}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;