import "./index.css";
import {
  loadingForm,
  addElement,
  assignUserInfo,
  createUserInfo
} from "../components/utils.js";

import {
  enableValidation,
  validationConfig,
  handleErrorOpenForm,
  addButtonDisabled,
} from "../components/validate.js";
import Api from "../components/api.js";
import Popup from "../components/Popup.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";

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
const buttonSaveProfile = document.querySelector('.popup__button-save_type_edit-profile');
const avatarNew = popupEditAvatar.querySelector('.popup__item_type_avatar');

const cardTemplateSelector = document.querySelector('#element-template');
const cardContainer = document.querySelector('.elements');

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15/",
  headers: {
    authorization: "6ee9b7c2-d5d1-459a-bd50-5fb4d3293905",
    "Content-Type": "application/json",
  }
});

import { popupImage } from "../components/PopupWithImage.js";

//constants of Popup Class
const editPopup = new Popup(popupEditProfile);
const addPopup = new Popup(popupAddCard);
const avatarPopup = new Popup(popupEditAvatar);
const imgPopup = new PopupWithImage(popupImage);
const editForm = new PopupWithForm(popupEditProfile, handleProfileFormSubmit);
const addForm = new PopupWithForm(popupAddCard, handleAddCardsFormSubmit);
const avatarForm = new PopupWithForm(popupEditAvatar, handleAvatarFormSubmit);



//forms' handlers
function handleProfileFormSubmit(evt){
    evt.preventDefault();
    loadingForm(true, popupEditProfile);
    api.editUserInfo(nameInput.value, aboutMeInput.value)
    .then((data) => {
        assignUserInfo(data.name, data.about);
        console.log(editForm)
        editForm.close();
      })
        .catch((err) => console.log(err))
        .finally(() => {
          loadingForm(false, popupEditProfile);
        });
}

function handleAddCardsFormSubmit(evt){
    evt.preventDefault();
    loadingForm(true, popupAddCard);
    api.postNewCard(caption.value, image.value)
    .then((data) => {
         console.log('123' + data);
         console.log(cardInProfile);
         addElement(cardInProfile);
         addForm.close();
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
      avatar.src = data.avatar;
      avatarForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, popupEditAvatar);
    });
}




//отрисовка страницы
Promise.all([api.getUserInfo(), api.getStartCards()])
    .then(([profileData, cardsData]) => {
      createUserInfo(profileData.name, profileData.about, profileData.avatar, profileData._id);

      const userId = profileData._id;
      const card = new Section ({
        data: cardsData,
        renderer: (item) => {
        const newCard = new Card ({
        data:item,
        handleAddLike: (id, count, like) => {
          api.addLike(id)
            .then(res => {
              like.classList.toggle('element__like_active');
              count.textContent = res.likes.length;
            })
            .catch((err) => console.log(err));
        },
        handleDelLike: (id, count, like) => {
          api.delLike(id)
            .then(res => {
              like.classList.toggle('element__like_active');
              count.textContent = res.likes.length;
            })
            .catch((err) => console.log(err));
        },
        handleDelCard: (id, card) => {
          api.deleteCard(id)
            .then((data) => {
              card.remove();
            })
            .catch((err) => console.log(err));
        },
        openPopupImage: () =>{
          imgPopup.open()
        }
      },
      cardTemplateSelector
      );
      const cardElement = newCard.createCard(userId);
      card.setItem(cardElement);
    }
    },
    cardContainer
    );
    card.rendererItems();
})
    .catch((err) => console.log('ошибКа' + err));




//открыть формы
editButton.addEventListener("click", function () {
  editPopup.open();
  nameInput.value = newName.textContent;
  aboutMeInput.value = newAboutMe.textContent;
  editForm.setEventListeners();
  addButtonDisabled(buttonSaveProfile);
  handleErrorOpenForm(popupEditProfile);
});

addButton.addEventListener("click", () => {
  addPopup.open();
  addForm.setEventListeners();
  addButtonDisabled(buttonSaveCard);
  handleErrorOpenForm(popupAddCard);
});

avatarButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarForm.setEventListeners();
  addButtonDisabled(buttonSaveAvatar);
  handleErrorOpenForm(popupEditAvatar);
});





//валидация полей ввода
enableValidation(validationConfig);





//eventListeners of Popup Class' constants
editPopup.setEventListeners();
addPopup.setEventListeners();
avatarPopup.setEventListeners();
imgPopup.setEventListeners();

