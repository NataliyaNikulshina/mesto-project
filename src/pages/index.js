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
import UserInfo from "../components/UserInfo.js"
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import { validationConfig } from "../components/variables.js";

import {
  popupEditProfile,
  popupAddCard,
  popupEditAvatar,
  buttonEditProfile,
  buttonAddCard,
  buttonAvatar,
  profile,
  name,
  about,
  avatar
} from "../components/variables.js";


const nameInput = document.querySelector(".popup__item_type_name");
const aboutMeInput = document.querySelector(".popup__item_type_about-me");

const image = popupAddCard.querySelector(".popup__item_type_link");
const caption = popupAddCard.querySelector(".popup__item_type_caption");

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

const info = new UserInfo ({
  nameSelector: '.profile__nickname',
  aboutSelector: '.profile__about-me',
  avatarSelector: '.profile__avatar',
},
{
  setUserInfo: (name, about) => {
    return api.editUserInfo(name, about);
  },
});


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  loadingForm(true, popupEditProfile);
  api
    .editUserInfo(nameInput.value, aboutMeInput.value)
    .then((data) => {
      info.setUserInfo(data.name, data.about);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, popupEditProfile);
      const popup = new PopupWithForm(".popup_type_edit");
      popup.close();
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
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, popupAddCard);
      const popup = new PopupWithForm(".popup_type_add");
      popup.close();
    });
}


function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  loadingForm(true, popupEditAvatar);
  api
    .editUserAvatar(avatarNew.value)
    .then((data) => {
      info.setUserAvatar(data.avatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, popupEditAvatar);
      const popup = new PopupWithForm(".popup_type_avatar");
      popup.close();
    });
}

//отрисовка страницы
Promise.all([api.getUserInfo(), api.getStartCards()])
  .then(([profileData, cardsData]) => {
    info.getUserInfo(profileData);

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

  nameInput.value = name.textContent;
  aboutMeInput.value = about.textContent;

  const formToSubmit = new PopupWithForm(".popup_type_edit", handleProfileFormSubmit);
  formToSubmit.open();
  formToSubmit.setEventListeners();
});

buttonAddCard.addEventListener("click", () => {
  const valid = new Validator(validationConfig, popupAddCard);
  valid.enableValidation();

  const formToSubmit = new PopupWithForm(".popup_type_add", handleAddCardsFormSubmit);
  formToSubmit.open();
  formToSubmit.setEventListeners();
});

buttonAvatar.addEventListener("click", () => {
  const valid = new Validator(validationConfig, popupEditAvatar);
  valid.enableValidation();

  const formToSubmit = new PopupWithForm(".popup_type_avatar", handleAvatarFormSubmit);
  formToSubmit.setEventListeners();
  formToSubmit.open();
});

