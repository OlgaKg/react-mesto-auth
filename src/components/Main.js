import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button type="button" className="profile__edit-avatar-btn" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
                </button>
                <div className="profile__info">
                    <div className="profile__bio">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__profession">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__edit-btn profile__edit-btn-open-popup" onClick={onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-btn profile__add-btn-open-popup" onClick={onAddPlace}></button>
            </section>
            <section className="elements" aria-label="галерея">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete} />
                ))}
            </section>
        </main>
    );
}
export default Main;