const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__button-close');
const saveButtonEditProfile = document.querySelector('.popup__button-save_type_edit-profile');
const elementsContainer = document.querySelector('.elements');
const saveButtonAddCard = document.querySelector('.popup__button-save_type_add-cards');
const formAddCards = document.querySelector('.popup__container_type_edit-profile');
const nameInput = document.querySelector('.popup__item_type_name');
const aboutMeInput = document.querySelector('.popup__item_type_about-me');
const userName = document.querySelector('.profile__nickname');
const userAboutMe = document.querySelector('.profile__about-me');
 
function openPopup(popup){
    popup.classList.add('popup_opened');
}

function closePopup(popup){
    popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt){
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userAboutMe.textContent = aboutMeIntut.value;
    closePopup(editPopup);
}

function editInfo(){
    formAddCards.addEventListener('submit', handleProfileFormSubmit);
    }

function addElements(linkValue, captionValue){
    const elementsTemplate = document.querySelector('#element-template').content;
    const element = elementsTemplate.querySelector('.element').cloneNode(true);

    element.querySelector('.element__image').src = linkValue;
    element.querySelector('.element__image').alt = captionValue;
    element.querySelector('.element__caption').textContent = captionValue;
//добавление лайков
    element.querySelector('.element__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_active');
    });
//добавление корзины
    element.querySelector('.element__trash').addEventListener('click', function(evt){
        closeElements(evt.target.closest('.element'))
    });
//открытие изображения карточки
    element.querySelector('.element__image').addEventListener('click', function(evt){
        openImages(evt.target.closest('.element__image'))
    });

    elementsContainer.prepend(element);
}

function closeElements(element){
    element.remove();
}

function openImages(img){
    const caption = img.parentElement.querySelector('.element__caption');
    openPopup(imagePopup);
    imagePopup.querySelector('.popup__image').src = img.src;
    imagePopup.querySelector('.popup__caption').textContent = caption.textContent;
}

//добавление 6 карточек на сайт сразу
initialCards.forEach(function(card){
    addElements(card.link, card.name);
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
saveButtonEditProfile.addEventListener('click', editInfo);


//добавление новой карточки
saveButtonAddCard.addEventListener('click', function () {
    const image = addPopup.querySelector('.popup__item_link');
    const caption = addPopup.querySelector('.popup__item_caption');

    addElements(image.value, caption.value);
    closePopup(addPopup);
    image.value = '';
    caption.value = '';
});