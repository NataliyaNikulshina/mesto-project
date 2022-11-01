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
  userId,
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


const card = new Section(
  {
    renderer: (item, userId) => {
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
  return newCard.createCard(userId);
}



//отрисовка страницы
Promise.all([api.getUserInfo(), api.getStartCards()])
  .then(([profileData, cardsData]) => {
    user.setUserInfo(profileData);
    user.setUserAvatar(profileData);
    userId = profileData._id;
    card.rendererItems(cardsData);
  })
  .catch((err) => console.log(err));

//открыть формы
//форма изменения профиля
buttonEditProfile.addEventListener("click", () => {
  const valid = new Validator(validationConfig, popupEditProfile);
  valid.enableValidation();
  inputName.value = user.getUserInfo().name.textContent;
  inputAbout.value = user.getUserInfo().about.textContent;
  const formToSubmit = new PopupWithForm(
    {
      submitForm: (inputs) => {
        api
          .editUserInfo(inputs["user-name"], inputs["about-me-input"])
          .then((data) => {
            user.setUserInfo(data);
            formToSubmit.close();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            loadingForm(false, popupEditProfile);
          });
      },
    },
    ".popup_type_edit"
  );

  popupEdit.open();
});


//форма Добавления новой кароточки
buttonAddCard.addEventListener("click", () => {
  const valid = new Validator(validationConfig, popupAddCard);
  valid.enableValidation();
  const formToSubmit = new PopupWithForm(
    {
      submitForm: (inputs) => {
        api
          .postNewCard(inputs["place-caption"], inputs["place-link"])
          .then((data) => {
            const userId = data.owner._id;
            const cardElement = newCard(data, userId);
            card.setItemPrepend(cardElement);
            formToSubmit.close();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            loadingForm(false, popupEditProfile);
          });
      },
    },
    ".popup_type_add"
  );


  popupAdd.open();
});


// форма изменения аватара
buttonAvatar.addEventListener("click", () => {
  const valid = new Validator(validationConfig, popupEditAvatar);
  valid.enableValidation();
  const formToSubmit = new PopupWithForm(
    {
      submitForm: (inputs) => {
        api
          .editUserAvatar(inputs["avatar-link"])
          .then((data) => {
            user.setUserAvatar(data);
            formToSubmit.close();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            loadingForm(false, popupEditProfile);
          });
      },
    },
    ".popup_type_avatar"
  );


  popupAvatar.open();
});

//add eventListeners globally
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
imgPopup.setEventListeners();