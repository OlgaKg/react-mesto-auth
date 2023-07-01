import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onAddPlace}) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-new-card"
      title="Новое место"
      submit="Создать"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
        <input
          className="popup__input popup__input_type_image-name"
          type="text"
          name="name"
          id="image-name-input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required="required"
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__input-error image-name-input-error"></span>
        <input
          className="popup__input popup__input_type_image-link"
          type="url"
          name="link"
          id="image-link-input"
          placeholder="Ссылка на картинку"
          required="required"
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__input-error image-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
