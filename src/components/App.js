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

import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import PageNotFound from './PageNotFound';
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
    const [isLoading, setIsLoading] = React.useState(false);

    const [isLoddedIn, setLoggedIn] = React.useState(null);
    const [isInfoTooltip, setInfoTooltip] = useState(false);
    const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);
    const [userData, setUserData] = React.useState(null);//разобраться 1ж23
    const navigate = useNavigate();
    const location = useLocation();

    const checkToken = () => {
        const jwt = localStorage.getItem('jwt');
        auth.getContent(jwt)
            .then((data) => {
                if (!data) {
                    return;
                }
                navigate(location.pathname);
                setLoggedIn(true);
                setUserData(data);
            })
            .catch(() => {
                setLoggedIn(false);
                setUserData(null);
            })
    }

    React.useEffect(() => {
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

    function handelRegisterSubmit(email, password) {
        auth.registerUser(email, password)
            .then(() => {
                setRegisterPopupOpen(true);
                setInfoTooltip(true);
                navigate('/singin');
            }).catch((err) => {
                setInfoTooltip(false);
                console.log(err)
            })
            .finally(() => setRegisterPopupOpen(true));
    }

    useEffect(() => {
        if (isLoddedIn) {
        Promise.all([api.getUserData(), api.getCards()])
            .then(([userData, initialCards]) => {
                setCurrentUser(userData);
                setCards(initialCards);
            }).catch((err) => { console.log(err) });
        }
    }, [isLoddedIn]);

    return (
        <AppContext.Provider value={{ isLoading, closeAllPopups }}>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Header email={userData}/>
                    <Routes>
                        <Route path="/" element={isLoddedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
                        <Route path="/signup" element={<Register handelRegisterSubmit={handelRegisterSubmit} />} />
                        <Route path="/signin" element={<Login handleLogin={() => setLoggedIn(true)} />} />
                        <Route path="/" element={
                            <ProtectedRoute
                                element={Main}
                                isLoddedIn={isLoddedIn}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                cards={cards}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete} />
                        } />
                        <Route path='/*' element={<PageNotFound />} />
                        {/* <Route path='*' element={<PageNotFound />} /> */}
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
                    />
                </div>
            </CurrentUserContext.Provider>
        </AppContext.Provider>
    );
}

export default App;