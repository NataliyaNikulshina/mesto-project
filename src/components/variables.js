export const validationConfig = {
    formSelector: ".popup__container",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-save_inactive",
    inputErrorClass: "popup__item_type_error",
    errorClass: "popup__input-error_active",
  };

  //popups
  export const popupWithImage = document.querySelector(".popup_type_image");
  export const popupEditProfile = document.querySelector(".popup_type_edit");
  export const popupAddCard = document.querySelector(".popup_type_add");
  export const popupEditAvatar = document.querySelector(".popup_type_avatar");
  //buttons
  export const buttonAddCard = document.querySelector(".profile__add-button");
  export const buttonEditProfile = document.querySelector(".profile__edit-button");
  export const buttonAvatar = document.querySelector(".profile__edit-avatar-button");
  //profile
  export const name = document.querySelector(".profile__nickname");
  export const about = document.querySelector(".profile__about-me");
  export const avatar = document.querySelector(".profile__avatar");

  export const popupImageCaption = document.querySelector(".popup__caption");
  export const popupImage = document.querySelector(".popup__image");