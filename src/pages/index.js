import "./index.css";
import {
  loadingForm,
  addElement,
  assignUserInfo,
  createUserInfo,
  addAllElements,
} from "../components/utils.js";
import { createElement } from "../components/card.js";
import {
  enableValidation,
  validationConfig,
  handleErrorOpenForm,
  addButtonDisabled,
} from "../components/validate.js";
import Api from "../components/api.js";

const editButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_add");
const addButton = document.querySelector(".profile__add-button");
const formEditProfile = document.querySelector(
  ".popup__container_type_edit-profile"
);
const formAddCards = document.querySelector(".popup__container_type_add-cards");
const nameInput = document.querySelector(".popup__item_type_name");
const aboutMeInput = document.querySelector(".popup__item_type_about-me");
const newName = document.querySelector(".profile__nickname");
const newAboutMe = document.querySelector(".profile__about-me");
const image = popupAddCard.querySelector(".popup__item_type_link");
const caption = popupAddCard.querySelector(".popup__item_type_caption");
const avatar = document.querySelector(".profile__avatar");
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const formEditAvatar = document.querySelector(
  ".popup__container_type_edit-avatar"
);
const avatarButton = document.querySelector(".profile__edit-avatar-button");
const buttonSaveCard = document.querySelector(
  ".popup__button-save_type_add-cards"
);
const buttonSaveAvatar = document.querySelector(
  ".popup__button-save_type_edit-avatar"
);
const buttonSaveProfile = document.querySelector(
  ".popup__button-save_type_edit-profile"
);
const avatarNew = popupEditAvatar.querySelector(".popup__item_type_avatar");
const popupImage = document.querySelector(".popup_type_image");
const imageInPopup = popupImage.querySelector(".popup__image");
const altImage = popupImage.querySelector(".popup__caption");

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15/",
  headers: {
    authorization: "6ee9b7c2-d5d1-459a-bd50-5fb4d3293905",
    "Content-Type": "application/json",
  }
});

//constants of Popup Class
const editPopup = new Popup(popupEditProfile);
const addPopup = new Popup(popupAddCard);
const avatarPopup = new Popup(popupEditAvatar);



Promise.all([api.getUserInfo(), api.getStartCards()])
  .then(([profileData, cardsData]) => {
    createUserInfo(
      profileData.name,
      profileData.about,
      profileData.avatar,
      profileData._id
    );
    cardsData.forEach((cards) => {
      const cardInProfile = createElement(
        cards.link,
        cards.name,
        cards._id,
        cards.likes,
        cards.owner,
        openPopupImage
      );
      addAllElements(cardInProfile);
    });
  })
  .catch((err) => console.log("ошибКа111" + err));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  loadingForm(true, popupEditProfile);
  api.editUserInfo(nameInput.value, aboutMeInput.value)
    .then((data) => {
      //console.log(data);
      assignUserInfo(data.name, data.about);
      editPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, popupEditProfile);
    });
}

function handleAddCardsFormSubmit(evt) {
  evt.preventDefault();
  loadingForm(true, popupAddCard);
  api.postNewCard(caption.value, image.value)
    .then((data) => {
      console.log(data);
      const cardInProfile = createElement(
        data.link,
        data.name,
        data._id,
        data.likes,
        data.owner,
        openPopupImage
      );
      addElement(cardInProfile);
      addPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, popupAddCard);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  loadingForm(true, popupEditAvatar);
  api.editUserAvatar(avatarNew.value)
    .then((data) => {
      //console.log(data);
      avatar.src = data.avatar;
      editPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, popupEditAvatar);
    });
}

//открытие формы с картинкой
function openPopupImage(img) {
  openPopup(popupImage);
  imageInPopup.src = img.src;
  imageInPopup.alt = img.alt;
  altImage.textContent = img.alt;
}

//отрисовка страницы



//открыть формы
editButton.addEventListener("click", function () {
  editPopup.open();
  nameInput.value = newName.textContent;
  aboutMeInput.value = newAboutMe.textContent;
  addButtonDisabled(buttonSaveProfile);
  handleErrorOpenForm(popupEditProfile);
});

addButton.addEventListener("click", () => {
  addPopup.open();
  formAddCards.reset();
  addButtonDisabled(buttonSaveCard);
  handleErrorOpenForm(popupAddCard);
});

avatarButton.addEventListener("click", () => {
  avatarPopup.open();
  formEditAvatar.reset();
  addButtonDisabled(buttonSaveAvatar);
  handleErrorOpenForm(popupEditAvatar);
});

//редактировать профиль
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

//редактировать аватар
formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

//добавление новой карточки
formAddCards.addEventListener("submit", handleAddCardsFormSubmit);

//валидация полей ввода
enableValidation(validationConfig);

//eventListeners of Popup Class' constants
editPopup.setEventListeners();
addPopup.setEventListeners();
avatarPopup.setEventListeners();