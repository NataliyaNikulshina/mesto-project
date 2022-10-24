import "./index.css";
import {
  loadingForm,
  addElement,
  assignUserInfo,
  createUserInfo,
} from "../components/utils.js";
import { Validator } from "../components/validate.js";
import Api from "../components/api.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage";
import { validationConfig } from "../components/variables.js";

import {
  popupEditProfile,
  popupAddCard,
  popupEditAvatar,
  buttonEditProfile,
  buttonAddCard,
  buttonAvatar,
} from "../components/variables.js";

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

const formEditAvatar = document.querySelector(
  ".popup__container_type_edit-avatar"
);
const avatarNew = popupEditAvatar.querySelector(".popup__item_type_avatar");
const cardTemplateSelector = document.querySelector("#element-template");
const cardContainer = document.querySelector(".elements");

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15/",
  headers: {
    authorization: "6ee9b7c2-d5d1-459a-bd50-5fb4d3293905",
    "Content-Type": "application/json",
  },
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  loadingForm(true, popupEditProfile);
  api
    .editUserInfo(nameInput.value, aboutMeInput.value)
    .then((data) => {
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
  api
    .postNewCard(caption.value, image.value)
    .then((data) => {
      console.log("123" + data);
      console.log(cardInProfile);
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
  api
    .editUserAvatar(avatarNew.value)
    .then((data) => {
      avatar.src = data.avatar;
      editPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, popupEditAvatar);
    });
}

//отрисовка страницы
Promise.all([api.getUserInfo(), api.getStartCards()])
  .then(([profileData, cardsData]) => {
    createUserInfo(
      profileData.name,
      profileData.about,
      profileData.avatar,
      profileData._id
    );
    const userId = profileData._id;
    const card = new Section(
      {
        data: cardsData,
        renderer: (item) => {
          const newCard = new Card(
            {
              data: item,
              handleAddLike: (id, count, like) => {
                api
                  .addLike(id)
                  .then((res) => {
                    like.classList.toggle("element__like_active");
                    count.textContent = res.likes.length;
                  })
                  .catch((err) => console.log(err));
              },
              handleDelLike: (id, count, like) => {
                api
                  .delLike(id)
                  .then((res) => {
                    like.classList.toggle("element__like_active");
                    count.textContent = res.likes.length;
                  })
                  .catch((err) => console.log(err));
              },
              handleDelCard: (id, card) => {
                api
                  .deleteCard(id)
                  .then((data) => {
                    card.remove();
                  })
                  .catch((err) => console.log(err));
              },
              handlePopupImage: () => {
                const imgPopup = new PopupWithImage(item, ".popup_type_image");
                imgPopup.open();
              },
            },
            cardTemplateSelector
          );
          const cardElement = newCard.createCard(userId);
          card.setItem(cardElement);
        },
      },
      cardContainer
    );
    card.rendererItems();
  })
  .catch((err) => console.log("ошибКа" + err));

//открыть формы
buttonEditProfile.addEventListener("click", function () {
  const valid = new Validator(validationConfig, popupEditProfile);
  valid.enableValidation();
  const popup = new Popup(".popup_type_edit");
  popup.open();
  nameInput.value = newName.textContent;
  aboutMeInput.value = newAboutMe.textContent;
  // addButtonDisabled(buttonSaveProfile);
  // handleErrorOpenForm(popupEditProfile);
});

buttonAddCard.addEventListener("click", () => {
  const valid = new Validator(validationConfig, popupAddCard);
  valid.enableValidation();
  const popup = new Popup(".popup_type_add");
  popup.open();
  formAddCards.reset();
  // addButtonDisabled(buttonSaveCard);
  // handleErrorOpenForm(popupAddCard);
});

buttonAvatar.addEventListener("click", () => {
  const valid = new Validator(validationConfig, popupEditAvatar);
  valid.enableValidation();
  const popup = new Popup(".popup_type_avatar");
  popup.open();
  formEditAvatar.reset();
  // addButtonDisabled(buttonSaveAvatar);
  // handleErrorOpenForm(popupEditAvatar);
});

//редактировать профиль
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

//редактировать аватар
formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

//добавление новой карточки
formAddCards.addEventListener("submit", handleAddCardsFormSubmit);
