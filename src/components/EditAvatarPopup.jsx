import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const avatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  React.useEffect(() => {
    if (!isOpen) {
      avatar.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="update-avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}
    >
        <input
          className="popup__input popup__input_type_avatar-link"
          type="url"
          name="avatar-link"
          id="avatar-link-input"
          placeholder="Ссылка на картинку"
          required="required"
          ref={avatar}
        />
        <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
