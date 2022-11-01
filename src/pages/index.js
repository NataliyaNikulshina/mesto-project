import "./index.css";
import {
  loadingForm,
  addElement
} from "../components/utils.js";
import { Validator } from "../components/validate.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo.js";
import { validationConfig } from "../components/variables.js";

import {
  popupEditProfile,
  popupAddCard,
  popupEditAvatar,
  buttonEditProfile,
  buttonAddCard,
  buttonAvatar,
  name,
  about,
  nameInput,
  aboutMeInput,
  image,
  caption,
  avatarNew,
  cardTemplateSelector,
  cardContainer,
  api,
  info
} from "../components/variables.js";


const imgPopup = new PopupWithImage(".popup_type_image");

const popupEdit = new PopupWithForm(
  { submitForm: (inputs) => {
      const profileInfo = new UserInfo()
      api
        .editUserInfo(inputs["user-name"], inputs["about-me-input"])
        .then((data) => {
          info.setUserInfo(data.name, data.about);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          loadingForm(false, popupEditProfile);
          popupEdit.close();
        });
    },
  },
  ".popup_type_edit"
);

const popupAdd = new PopupWithForm(
  { submitForm: (inputs) => {
      api
        .postNewCard(inputs["place-caption"], inputs["place-link"])
        .then((data) => {
          const userId = data.owner._id;
          const card = new Section({}, cardContainer);
          const newCard = new Card(
            {
              data: data,
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
                  .then(() => {
                    card.remove();
                  })
                  .catch((err) => console.log(err));
              },
              handlePopupImage: (evt) => {
                imgPopup.open();
              },
            },
            cardTemplateSelector
          );
          const cardElement = newCard.createCard(userId);
          card.setItemPrepend(cardElement);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          loadingForm(false, popupAddCard);
          popupAdd.close();
        });
    },
  },
  ".popup_type_add"
);

const popupAvatar = new PopupWithForm(
  { submitForm: (inputs) => {
      api
        .editUserAvatar(inputs["avatar-link"])
        .then((data) => {
          info.setUserAvatar(data.avatar);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          loadingForm(false, popupEditAvatar);
          popupAvatar.close();
        });
    },
  },
  ".popup_type_avatar"
);

//submit handlers
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
      popupEdit.close();
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
      popupAdd.close();
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
      popupAvatar.close();
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
              handlePopupImage: (evt) => {
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


//change profile info
buttonEditProfile.addEventListener("click", function () {
  const valid = new Validator(validationConfig, popupEditProfile);
  valid.enableValidation();

  nameInput.value = name.textContent;
  aboutMeInput.value = about.textContent;

  popupEdit.open();
});


//add a card
buttonAddCard.addEventListener("click", () => {
  const valid = new Validator(validationConfig, popupAddCard);
  valid.enableValidation();

  popupAdd.open();
});


//change avatar
buttonAvatar.addEventListener("click", () => {
  const valid = new Validator(validationConfig, popupEditAvatar);
  valid.enableValidation();

  popupAvatar.open();
});

//add eventListeners globally
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
imgPopup.setEventListeners();