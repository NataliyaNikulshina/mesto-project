import "./index.css";
import Validator from "../components/validate.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import Popup from "../components/Popup";
import Api from "../components/api.js";
import UserInfo from "../components/UserInfo.js";
import {
  loadingForm,
  addElement
} from "../components/utils.js";
import {
  validationConfig,
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
  avatarNew,
  cardTemplateSelector,
  cardContainer,
  api,
  info
} from "../components/variables.js";


export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15/",
  headers: {
    authorization: "6ee9b7c2-d5d1-459a-bd50-5fb4d3293905",
    "Content-Type": "application/json",
  },
});

const info = new UserInfo(
  {
    name: ".profile__nickname",
    about: ".profile__about-me",
    avatar: ".profile__avatar"
  }
);

const avatarPopup = new Popup(".popup_type_avatar");
const addCardPopup = new Popup(".popup_type_add");
const editInfoPopup = new Popup(".popup_type_edit");


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
      const popup = new PopupWithForm(".popup_type_edit");
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
    user.setUserInfo(profileData);
    user.setUserAvatar(profileData);

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
                  .then(() => {
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
          card.setItemAppend(cardElement);
        },
      },
      cardContainer
    );
    card.rendererItems();
  })
  .catch((err) => console.log(err));

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


buttonAvatar.addEventListener("click", () => {
  const valid = new Validator(validationConfig, popupEditAvatar);
  valid.enableValidation();

  const formToSubmit = new PopupWithForm(".popup_type_avatar", handleAvatarFormSubmit);
  formToSubmit.setEventListeners();
  formToSubmit.open();
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
                handlePopupImage: () => {
                  const imgPopup = new PopupWithImage(
                    item,
                    ".popup_type_image"
                  );
                  imgPopup.open();
                },
              },
              cardTemplateSelector
            );
            const cardElement = newCard.createCard(userId);
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
  formToSubmit.open();
});
