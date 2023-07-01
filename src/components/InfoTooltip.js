import React from 'react';
import { AppContext } from '../contexts/AppContext';

function InfoTooltip({ isOpen, registerStatus, name }) {
    const appContext=React.useContext(AppContext);

    return(
      <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
          <button className="popup__closed-btn" type="button" onClick={appContext.closeAllPopups} />
           <img className={`popup__registerStatus ${registerStatus ? 'popup__registerStatus_success' : 'popup__registerStatus_fail'}`}/>
         <h3 className="popup__title">{registerStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h3>
      </div>
  </div>
    )
}

export default InfoTooltip;