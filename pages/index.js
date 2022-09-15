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



function openPopup(popup){
    popup.classList.add('popup_opened');
}

function closePopup(popup){
    popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt){
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userAboutMe.textContent = aboutMeInput.value;
    closePopup(editPopup);
}

function handleAvatarFormSubmit(evt){
    evt.preventDefault();
    const avatarNew = editAvatar.querySelector('.popup__item_type_avatar');
    avatar.src = avatarNew.value;
   // console.log(avatarNew.value);
    closePopup(editAvatar);
}

function handleAddCardsFormSubmit(evt){
    evt.preventDefault();
    const cardNew = createElement(image.value, caption.value);
    addElement(cardNew);
    closePopup(addPopup);
    formAddCards.reset();
}

function handleElementLike(evt){
    evt.target.classList.toggle('element__like_active')
}

function handleElementDelete(evt){
    removeElement(evt.target.closest('.element'))
}

function createElement(linkValue, captionValue){
    const element = elementsTemplate.querySelector('.element').cloneNode(true);
    const imageElement = element.querySelector('.element__image');
    imageElement.src = linkValue;
    imageElement.alt = captionValue;
    element.querySelector('.element__caption').textContent = captionValue;
//добавление лайков
    element.querySelector('.element__like').addEventListener('click', handleElementLike);
//добавление корзины
    element.querySelector('.element__trash').addEventListener('click', handleElementDelete);
//открытие изображения карточки
    imageElement.addEventListener('click', function(){
        openImage(imageElement)
    });
    return(element);
}

function addElement(element){
    elementsContainer.prepend(element);
}

function removeElement(element){
    element.remove();
}

function openImage(img){
    openPopup(imagePopup);
    imageInPopup.src = img.src;
    imageInPopup.alt = img.alt;
    altImage.textContent = img.alt;
}

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

//добавление новой карточки
formEditAvatar.addEventListener('submit', handleAvatarFormSubmit);


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button-save_inactive');
        buttonElement.setAttribute('disabled', true);
      }
    else {
        buttonElement.classList.remove('popup__button-save_inactive');
        buttonElement.removeAttribute('disabled');
      }
  }
  
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__item_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__item_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };
  
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } 
    else {
      hideInputError(formElement, inputElement);
    }
  };
  
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
    const buttonElement = formElement.querySelector('.popup__button-save');
    //console.log(inputList);
    //console.log(buttonElement);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__container'));
    //console.log(formList);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      const fieldsetList = Array.from(formElement.querySelectorAll('.popup__user-info'));
      //console.log(fieldsetList);
      fieldsetList.forEach ((fieldSet) => {
       setEventListeners(fieldSet);
      });
    });
  };
  
enableValidation();
  
