const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__button-close');
const saveButtonEditProfile = document.querySelector('.popup__button-save_type_edit-profile');
const elementsContainer = document.querySelector('.elements');
const saveButtonAddCard = document.querySelector('.popup__button-save_type_add-cards');
const formEditProfile = document.querySelector('.popup__container_type_edit-profile');
const formAddCards = document.querySelector('.popup__container_type_add-cards');
const nameInput = document.querySelector('.popup__item_type_name');
const aboutMeInput = document.querySelector('.popup__item_type_about-me');
const userName = document.querySelector('.profile__nickname');
const userAboutMe = document.querySelector('.profile__about-me');
const elementsTemplate = document.querySelector('#element-template').content;
const image = addPopup.querySelector('.popup__item_link');
const caption = addPopup.querySelector('.popup__item_caption');


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

function handleAddCardsFormSubmit(evt){
    evt.preventDefault();
    let cardNew = createElement(image.value, caption.value);
    addElement(cardNew);
    closePopup(addPopup);
    formAddCards.reset();
}

function handleElementLike(evt){
    evt.target.classList.toggle('element__like_active')
}

function handleElementDelete(evt){
    closeElement(evt.target.closest('.element'))
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

function closeElement(element){
    element.remove();
}

function openImage(img){
    openPopup(imagePopup);
    const imageInPopup = imagePopup.querySelector('.popup__image');
    imageInPopup.src = img.src;
    imageInPopup.alt = img.alt;
    imagePopup.querySelector('.popup__caption').textContent = img.alt;
}

//добавление 6 карточек на сайт сразу
initialCards.forEach(function(card){
    let cardInProfile = createElement(card.link, card.name);
    addElement(cardInProfile);
    });  

//открыть формы
editButton.addEventListener('click', () => openPopup(editPopup));
addButton.addEventListener('click', () => openPopup(addPopup));

//закрытие форм
closeButtons.forEach((btn) => 
    btn.addEventListener('click', (evt) => 
closePopup(evt.target.closest('.popup'))
));

//редактировать профиль 
formEditProfile.addEventListener('submit', handleProfileFormSubmit);


//добавление новой карточки
formAddCards.addEventListener('submit', handleAddCardsFormSubmit);
