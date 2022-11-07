import "./index.css";
import loadingForm from "../components/utils.js";
import Validator from "../components/validate.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import Api from "../components/api.js";
import UserInfo from "../components/UserInfo.js";

import {
  validationConfig,
  popupEditProfile,
  popupAddCard,
  popupEditAvatar,
  buttonEditProfile,
  buttonAddCard,
  buttonAvatar,
  inputName,
  inputAbout,
  cardTemplateSelector,
  cardContainer,
} from "../components/variables.js";

const imgPopup = new PopupWithImage(".popup_type_image");

const popupEdit = new PopupWithForm(
  {
    submitForm: (inputs) => {
      api
        .editUserInfo(inputs["user-name"], inputs["about-me-input"])
        .then((data) => {
          user.setUserInfo(data);
          popupEdit.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          loadingForm(false, popupEditProfile);
        });
    },
  },
  ".popup_type_edit"
);

const popupAdd = new PopupWithForm(
  {
    submitForm: (inputs) => {
      api
        .postNewCard(inputs["place-caption"], inputs["place-link"])
        .then((data) => {
          const userId = data.owner._id;
          const cardElement = newCard(data, userId);
          card.setItemPrepend(cardElement);
          popupAdd.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          loadingForm(false, popupAddCard);
        });
    },
  },
  ".popup_type_add"
);

const popupAvatar = new PopupWithForm(
  {
    submitForm: (inputs) => {
      api
        .editUserAvatar(inputs["avatar-link"])
        .then((data) => {
          user.setUserAvatar(data);
          popupAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          loadingForm(false, popupEditAvatar);
        });
    },
  },
  ".popup_type_avatar"
);

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15/",
  headers: {
    authorization: "6ee9b7c2-d5d1-459a-bd50-5fb4d3293905",
    "Content-Type": "application/json",
  },
});

const user = new UserInfo({
  name: ".profile__nickname",
  about: ".profile__about-me",
  avatar: ".profile__avatar",
});

const card = new Section(
  {
    renderer: (item) => {
      const userId = user.getUserId();

      const cardElement = newCard(item, userId);
      card.setItemAppend(cardElement);
    },
  },
  cardContainer
);

function newCard(item, userId) {
  const newCard = new Card(
    {
      data: item,
      id: userId,
      handleAddLike: (id) => {
        api
          .addLike(id)
          .then((res) => {
            newCard.toggleLike(res);
          })
          .catch((err) => console.log(err));
      },
      handleDelLike: (id) => {
        api
          .delLike(id)
          .then((res) => {
            newCard.toggleLike(res);
          })
          .catch((err) => console.log(err));
      },
      handleDelCard: (id) => {
        api
          .deleteCard(id)
          .then(() => {
            newCard.deleteCard();
          })
          .catch((err) => console.log(err));
      },
      handlePopupImage: () => {
        imgPopup.open(item);
      },
    },
    cardTemplateSelector
  );
  return newCard.createCard();
}

//отрисовка страницы
Promise.all([api.getUserInfo(), api.getStartCards()])
  .then(([profileData, cardsData]) => {
    user.setUserInfo(profileData);
    user.setUserAvatar(profileData);
    card.rendererItems(cardsData);
  })
  .catch((err) => console.log(err));

const validEditProfile = new Validator(validationConfig, popupEditProfile);
const validAddCard = new Validator(validationConfig, popupAddCard);
const validEditAvatar = new Validator(validationConfig, popupEditAvatar);

validEditProfile.enableValidation();
validAddCard.enableValidation();
validEditAvatar.enableValidation();

//открыть формы
//форма изменения профиля
buttonEditProfile.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  inputName.value = userInfo.name.textContent;
  inputAbout.value = userInfo.about.textContent;
  popupEdit.open();
  validEditProfile.deleteErrors();
});

//форма Добавления новой кароточки
buttonAddCard.addEventListener("click", () => {
  popupAdd.open();
  validAddCard.deleteErrors();
});

// форма изменения аватара
buttonAvatar.addEventListener("click", () => {
  popupAvatar.open();
  validEditAvatar.deleteErrors();
});

//add eventListeners globally
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
imgPopup.setEventListeners();
