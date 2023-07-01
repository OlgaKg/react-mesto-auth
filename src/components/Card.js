import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const handleCardClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `elements__like-btn ${isLiked && 'elements__like-btn_active'}`
    );

    return (
        <article className="elements__element">
            {isOwn && <button
                className="elements__delete-btn"
                type="button"
                onClick={handleDeleteClick}
            />}
            <img
                className="elements__image"
                src={card.link}
                alt={`${card.name}`}
                onClick={handleCardClick} />
            <div className="elements__container">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__container-likes">
                    <button
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                        type="button">
                    </button>
                    <p className="elements__like-count">{card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;