import Api from "./api";
import UserInfo from "./UserInfo";

//validation
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
export const nameInput = document.querySelector(".popup__item_type_name");
export const aboutMeInput = document.querySelector(".popup__item_type_about-me");

//images
export const popupImageCaption = document.querySelector(".popup__caption");
export const popupImage = document.querySelector(".popup__image");

//add cards
export const image = popupAddCard.querySelector(".popup__item_type_link");
export const caption = popupAddCard.querySelector(".popup__item_type_caption");

//avatar
export const avatarNew = popupEditAvatar.querySelector(".popup__item_type_avatar");

//card template
export const cardTemplateSelector = document.querySelector("#element-template");
export const cardContainer = document.querySelector(".elements");


//classes' instances
export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15/",
  headers: {
    authorization: "6ee9b7c2-d5d1-459a-bd50-5fb4d3293905",
    "Content-Type": "application/json",
  },
});

export const info = new UserInfo ({
    nameSelector: '.profile__nickname',
    aboutSelector: '.profile__about-me',
    avatarSelector: '.profile__avatar',
  },
  {
    setUserInfo: (name, about) => {
      return api.editUserInfo(name, about);
    },
  });