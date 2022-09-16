const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editAvatar = document.querySelector('.popup_type_avatar');
const imagePopup = document.querySelector('.popup_type_image');
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__button-close');
const saveButtonEditProfile = document.querySelector('.popup__button-save_type_edit-profile');
const elementsContainer = document.querySelector('.elements');
const saveButtonAddCard = document.querySelector('.popup__button-save_type_add-cards');
const formEditProfile = document.querySelector('.popup__container_type_edit-profile');
const formAddCards = document.querySelector('.popup__container_type_add-cards');
const formEditAvatar = document.querySelector('.popup__container_type_edit-avatar');
const nameInput = document.querySelector('.popup__item_type_name');
const aboutMeInput = document.querySelector('.popup__item_type_about-me');
const userName = document.querySelector('.profile__nickname');
const userAboutMe = document.querySelector('.profile__about-me');
const elementsTemplate = document.querySelector('#element-template').content;
const image = addPopup.querySelector('.popup__item_type_link');
const caption = addPopup.querySelector('.popup__item_type_caption');
const avatar = document.querySelector('.profile__avatar');
const imageInPopup = imagePopup.querySelector('.popup__image'); 
const altImage = imagePopup.querySelector('.popup__caption');

const enableValidation = ({
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__user-info',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
}); 


//добавление 6 карточек на сайт сразу
initialCards.forEach(function(card){
    const cardInProfile = createElement(card.link, card.name);
    addElement(cardInProfile);
    });  

//открыть формы
editButton.addEventListener('click', function() { 
    openPopup(editPopup);
    nameInput.value = userName.textContent;
    aboutMeInput.value = userAboutMe.textContent;
});

addButton.addEventListener('click', () => openPopup(addPopup));

//закрытие форм по нажанию кнопки "Закрыть"
closeButtons.forEach((btn) => 
    btn.addEventListener('click', (evt) => 
closePopup(evt.target.closest('.popup'))
));

//закрытие формы, нажимая на Esc
document.addEventListener('keydown', function(evt){
    if (evt.key === 'Escape') {
       // console.log(document.querySelector('.popup_opened'));
        closePopup(document.querySelector('.popup_opened'));}
    });

//закрытие формы по клику вне формы
document.addEventListener('mouseup', function(evt){
    if(evt.target.classList.contains('popup')){
       // console.log(evt.target);
       // console.log(evt.target.closest('.popup'));
        closePopup(evt.target.closest('.popup'));}
    });

//редактировать профиль 
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//добавление новой карточки
formAddCards.addEventListener('submit', handleAddCardsFormSubmit);

//изменение аватар
formEditAvatar.addEventListener('submit', handleAvatarFormSubmit);


import {openPopup, closePopup, addElement} from './utils.js'; 
import {handleProfileFormSubmit, handleAvatarFormSubmit, handleAddCardsFormSubmit} from './modal.js';
import {createElement} from './card.js';  
import {initialCards} from './initial-cards.js'; 
import {enableValidation as eValidation} from "./validate.js";
export {enableValidation, editButton, saveButtonEditProfile, elementsContainer, saveButtonAddCard, editPopup, elementsTemplate, imageInPopup, imagePopup, altImage, userName, userAboutMe, nameInput, aboutMeInput, editAvatar, avatar, addPopup, formAddCards, image, caption}; 
eValidation();
  
