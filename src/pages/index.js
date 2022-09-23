import './index.css'; 
import {addElement} from '../components/utils.js'; 
import {openPopup, closePopup} from '../components/modal.js';
import {createElement} from '../components/card.js';  
import {initialCards} from '../components/initial-cards.js'; 
import {enableValidation} from '../components/validate.js'; 

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
const userName = document.querySelector('.profile__nickname');
const userAboutMe = document.querySelector('.profile__about-me');
const image = popupAddCard.querySelector('.popup__item_type_link');
const caption = popupAddCard.querySelector('.popup__item_type_caption');


const objValidation = ({
    formSelector: '.popup__container',
    fieldsetSelector: '.popup__user-info',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error_active'
  }); 

function handleProfileFormSubmit(evt){
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userAboutMe.textContent = aboutMeInput.value;
    closePopup(popupEditProfile);
}

function handleAddCardsFormSubmit(evt){
    evt.preventDefault();
    const cardNew = createElement(image.value, caption.value);
    addElement(cardNew);
    closePopup(popupAddCard);
    formAddCards.reset();
    enableValidation(objValidation); 
}


//добавление 6 карточек на сайт сразу
initialCards.forEach(function(card){
    const cardInProfile = createElement(card.link, card.name);
    addElement(cardInProfile);
    });  

//открыть формы
editButton.addEventListener('click', function() { 
    openPopup(popupEditProfile);
    nameInput.value = userName.textContent;
    aboutMeInput.value = userAboutMe.textContent;
});

addButton.addEventListener('click', () => openPopup(popupAddCard));

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

//добавление новой карточки
formAddCards.addEventListener('submit', handleAddCardsFormSubmit);

enableValidation(objValidation); 

export { objValidation}; 

