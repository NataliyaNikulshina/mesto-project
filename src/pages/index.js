import './index.css'; 
//import {addElement, userName, userAboutMe} from '../components/utils.js'; 
import {openPopup, closePopup} from '../components/modal.js';
import {createElement} from '../components/card.js';  
//import {initialCards} from '../components/initial-cards.js'; 
import {enableValidation,validationConfig, handleErrorOpenForm} from '../components/validate.js'; 
import {getAllCards, getUserInfo, postNewCards, editUserInfo, editUserAvatar} from '../components/api.js'; 


const popups = document.querySelectorAll(".popup");
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__button-close');
const formEditProfile = document.querySelector('.popup__container_type_edit-profile');
const formAddCards = document.querySelector('.popup__container_type_add-cards');
const nameInput = document.querySelector('.popup__item_type_name');
const aboutMeInput = document.querySelector('.popup__item_type_about-me');
const newName = document.querySelector('.profile__nickname');
const newAboutMe = document.querySelector('.profile__about-me');
const image = popupAddCard.querySelector('.popup__item_type_link');
const caption = popupAddCard.querySelector('.popup__item_type_caption');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const formEditAvatar = document.querySelector('.popup__container_type_edit-avatar');
//const avatar = document.querySelector('.profile__avatar');
const avatarButton = document.querySelector('.profile__edit-avatar-button');





function handleProfileFormSubmit(evt){
    evt.preventDefault();
    editUserInfo(nameInput.value, aboutMeInput.value);
    //userName.textContent = nameInput.value;
    //userAboutMe.textContent = aboutMeInput.value;
    closePopup(popupEditProfile);
    formEditAvatar.reset();
}

function handleAddCardsFormSubmit(evt){
    evt.preventDefault();
    postNewCards(image.value, caption.value);
    //createElement(image.value, caption.value);
    //addElement(cardNew);
    closePopup(popupAddCard);
    formAddCards.reset();
}

function handleAvatarFormSubmit(evt){
    evt.preventDefault();
    const avatarNew = popupEditAvatar.querySelector('.popup__item_type_avatar');
    editUserAvatar(avatarNew.value);
   // const avatarNew = popupEditAvatar.querySelector('.popup__item_type_avatar');
   // avatar.src = avatarNew.value;
   // console.log(avatarNew.value);
    closePopup(popupEditAvatar); 
}

//добавление 6 карточек на сайт сразу
//initialCards.forEach(function(card){
   // const cardInProfile = createElement(card.link, card.name);
  //  addElement(cardInProfile);
  //  });  
    getAllCards();
    getUserInfo();

//открыть формы
editButton.addEventListener('click', function() { 
    openPopup(popupEditProfile);
    nameInput.value = newName.textContent;
    aboutMeInput.value = newAboutMe.textContent;
    handleErrorOpenForm(popupEditProfile);
});

addButton.addEventListener('click', () => {
    openPopup(popupAddCard);
    formAddCards.reset();
    handleErrorOpenForm(popupAddCard);
});

avatarButton.addEventListener('click', () => {
    openPopup(popupEditAvatar);
    formEditAvatar.reset();
    handleErrorOpenForm(popupEditAvatar);
});


//закрытие форм по кнопке "Закрыть" 
closeButtons.forEach((btn) =>  
    btn.addEventListener('click', (evt) =>  
closePopup(evt.target.closest('.popup')) 
)); 

//закрытие формы по клику на оверлей
popups.forEach(function(popup) {
    popup.addEventListener('mouseup', function(evt){
    if(evt.target.classList.contains('popup')){
       // console.log(evt.target);
       // console.log(evt.target.closest('.popup'));
        closePopup(evt.target.closest('.popup'));}
    });
});

//редактировать профиль 
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//редактировать аватар
formEditAvatar.addEventListener('submit', handleAvatarFormSubmit);

//добавление новой карточки
formAddCards.addEventListener('submit', handleAddCardsFormSubmit);

enableValidation(validationConfig); 



