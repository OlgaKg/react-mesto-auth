import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext'
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import { ProtectedRoute } from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth'

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImgPopupOpen, setIsImgPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImgPopupOpen;
    const [isLoading, setIsLoading] = useState(false);

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltip, setInfoTooltip] = useState(false);
    const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const checkToken = () => {
        const jwt = localStorage.getItem('jwt');
        auth.getContent(jwt)
            .then((response) => {
                if (!response) {
                    return;
                }
                navigate(location.pathname);
                setLoggedIn(true);
                setEmail(response.data.email);
            })
            .catch(() => {
                setLoggedIn(false);
                setEmail(null);
            })
    }

    useEffect(() => {
        checkToken();
    }, []);

    if (isLoading === null) {
        return <div class='loading'>Loading</div>//add style 
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImgPopupOpen(true)
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setIsImgPopupOpen(false);
        setIsLoading(false);
        setRegisterPopupOpen(false)
    }

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch((err) => { console.log(err) });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            }).catch((err) => { console.log(err) });
    }

    function handleSubmit(request) {
        setIsLoading(true);
        request()
            .then(closeAllPopups)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }

    function handleUpdateUser(inputValues) {
        function makeRequest() {
            return api.updateUserData(inputValues).then(setCurrentUser);
        }
        handleSubmit(makeRequest);
    }

    function handleUpdateAvatar(inputValues) {
        function makeRequest() {
            return api.updateAvatar(inputValues).then(setCurrentUser);
        }
        handleSubmit(makeRequest);
    }

    function handleAddPlaceSubmit(inputValues) {
        function makeRequest() {
            return api.addNewCard(inputValues).then((newCard) => {
                setCards([newCard, ...cards])
            })
        }
        handleSubmit(makeRequest);
    }

    function handleRegisterSubmit(email, password) {
        auth.registerUser(email, password)
            .then(() => {
                setRegisterPopupOpen(true);
                setInfoTooltip(true);
                navigate('/signin');
            }).catch((err) => {
                setInfoTooltip(false);
                console.log(err)
            })
            .finally(() => setRegisterPopupOpen(true));
    }

    const handleLogin = (email) => {
        setLoggedIn(true);
        setEmail(email);
    }

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getUserData(), api.getCards()])
                .then(([userData, initialCards]) => {
                    setCurrentUser(userData);
                    setCards(initialCards);
                }).catch((err) => { console.log(err) });
        }
    }, [isLoggedIn]);

    return (
        <AppContext.Provider value={{ isLoading, closeAllPopups }}>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Header email={email} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
                    <Routes>
                        <Route path="/signup" element={<Register handleRegisterSubmit={handleRegisterSubmit} />} />
                        <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
                        <Route path="/" element={
                            <ProtectedRoute
                                element={Main}
                                isLoggedIn={isLoggedIn}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                cards={cards}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete} />
                        } />
                        <Route path='*' element={<Navigate to='/signin' replace />} />
                    </Routes>

                    <Footer />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onUpdateAvatar={handleUpdateAvatar} />

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onUpdateUser={handleUpdateUser} />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onAddPlace={handleAddPlaceSubmit} />

                    <ImagePopup
                        isOpen={isImgPopupOpen}
                        card={selectedCard} />

                    <InfoTooltip
                        isOpen={isRegisterPopupOpen}
                        registerStatus={isInfoTooltip}
                        successMessage="Вы успешно зарегистрировались!"
                        failureMessage="Что-то пошло не так! Попробуйте еще раз."
                    />
                </div>
            </CurrentUserContext.Provider>
        </AppContext.Provider>
    );
}

export default App;