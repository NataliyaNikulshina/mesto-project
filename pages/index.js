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
const image = addPopup.querySelector('.popup__item_type_link');
const caption = addPopup.querySelector('.popup__item_type_caption');
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
