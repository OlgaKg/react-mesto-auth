import React from 'react';
import { AppContext } from '../contexts/AppContext';


function ImagePopup({ card, isOpen }) {
  const appContext=React.useContext(AppContext);

  return (
    <div className={`popup popup_type_image ${isOpen && 'popup_opened'}`}>
      <figure className="popup__figure-image">
        <img className="popup__preview-image" src={card.link} alt={card.name} />
        <button className="popup__closed-btn" type="button" onClick={appContext.closeAllPopups}></button>
        <figcaption className="popup__title-image">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;