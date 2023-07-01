import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
        <input
          className="popup__input popup__input_type_user-name"
          type="text"
          name="name"
          id="username-input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required="required"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__input-error username-input-error"></span>
        <input
          className="popup__input popup__input_type_profession"
          type="text"
          name="about"
          id="profession-input"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required="required"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error profession-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
