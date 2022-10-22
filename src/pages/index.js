import "./index.css";
import {
  loadingForm,
  addElement,
  assignUserInfo,
  createUserInfo,
  addAllElements,
} from "../components/utils.js";
import { openPopup, closePopup } from "../components/modal.js";
//import { createElement } from "../components/card.js";
import {
  enableValidation,
  validationConfig,
  handleErrorOpenForm,
  addButtonDisabled,
} from "../components/validate.js";
import Api from "../components/api.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const formEditProfile = document.querySelector('.popup__container_type_edit-profile');
const formAddCards = document.querySelector('.popup__container_type_add-cards');
const nameInput = document.querySelector('.popup__item_type_name');
const aboutMeInput = document.querySelector('.popup__item_type_about-me');
const newName = document.querySelector('.profile__nickname');
const newAboutMe = document.querySelector('.profile__about-me');
const image = popupAddCard.querySelector('.popup__item_type_link');
const caption = popupAddCard.querySelector('.popup__item_type_caption');
const avatar = document.querySelector('.profile__avatar');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const formEditAvatar = document.querySelector('.popup__container_type_edit-avatar');
const avatarButton = document.querySelector('.profile__edit-avatar-button');
const buttonSaveCard = document.querySelector('.popup__button-save_type_add-cards');
const buttonSaveAvatar = document.querySelector('.popup__button-save_type_edit-avatar');
const buttonSaveProfile = document.querySelector('.popup__button-save_type_edit-profile');
const avatarNew = popupEditAvatar.querySelector('.popup__item_type_avatar');
const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image'); 
const altImage = popupImage.querySelector('.popup__caption');
const cardTemplateSelector = document.querySelector('#element-template');
const cardContainer = document.querySelector('.elements');

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15/",
  headers: {
    authorization: "6ee9b7c2-d5d1-459a-bd50-5fb4d3293905",
    "Content-Type": "application/json",
  }
});

function handleProfileFormSubmit(evt){
    evt.preventDefault();
    loadingForm(true, popupEditProfile);
    api.editUserInfo(nameInput.value, aboutMeInput.value)
    .then((data) => {
        //console.log(data);
        assignUserInfo(data.name, data.about);
        closePopup(popupEditProfile);
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
         closePopup(popupAddCard);
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
      closePopup(popupEditAvatar);
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
        openPopupImage: (img) =>{
          openPopup(popupImage);
          imageInPopup.src = img.src;
          imageInPopup.alt = img.alt;
          altImage.textContent = img.alt;
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
  openPopup(popupEditProfile);
  nameInput.value = newName.textContent;
  aboutMeInput.value = newAboutMe.textContent;
  addButtonDisabled(buttonSaveProfile);
  handleErrorOpenForm(popupEditProfile);
});

addButton.addEventListener("click", () => {
  openPopup(popupAddCard);
  formAddCards.reset();
  addButtonDisabled(buttonSaveCard);
  handleErrorOpenForm(popupAddCard);
});

avatarButton.addEventListener("click", () => {
  openPopup(popupEditAvatar);
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
