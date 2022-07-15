const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__button-close');
const saveButton = document.querySelector('.popup__button-save');
const elementsContainer = document.querySelector('.elements');
const saveElementsButton = document.querySelector('.popup__button-save_cards');


const initialCards = [
    {
      name: 'Плато Матлас',
      link: '../images/elements/plato_matlas.jpg'
    },
    {
      name: 'Гора Ахун',
      link: '../images/elements/mountain_ahyn.jpg'
    },
    {
      name: 'Куршская коса',
      link: '../images/elements/kyrshskaya_kosa.jpg'
    },
    {
      name: 'Карелия',
      link: '../images/elements/karelia.jpg'
    },
    {
      name: 'Крым',
      link: '../images/elements/krym.jpg'
    },
    {
      name: 'Дагестан',
      link: '../images/elements/dagestan.jpg'
    }
  ]; 

 
function openedPopup(popup){
    popup.classList.add('popup_opened');
}

function closedPopup(popup){
    popup.classList.remove('popup_opened');
}

function editInfo(){
    const formElement = document.querySelector('.popup__container');
    const nameInput = document.querySelector('.popup__item_name');
    const jobIntut = document.querySelector('.popup__item_about-me');
    function formSubmitHandler(evt){
        evt.preventDefault();
        let userName = document.querySelector('.profile__nickname');
        let userAboutMe = document.querySelector('.profile__about-me');
        userName.textContent = nameInput.value;
        userAboutMe.textContent = jobIntut.value;
        closedPopup(editPopup);
    }
    formElement.addEventListener('submit', formSubmitHandler);
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
        closedElements(evt.target.closest('.element'))
    });
//открытие изображения карточки
    element.querySelector('.element__image').addEventListener('click', function(evt){
        openedImages(evt.target.closest('.element__image'))
    });

    elementsContainer.prepend(element);
}

function closedElements(element){
    element.remove();
}

function openedImages(img){
    const caption = img.parentElement.querySelector('.element__caption');
    openedPopup(imagePopup);
    imagePopup.querySelector('.popup__image').src = img.src;
    imagePopup.querySelector('.popup__caption').textContent = caption.textContent;
}

//добавление 6 карточек на сайт сразу
initialCards.forEach(function(card){
    addElements(card.link, card.name);
    });  

//открыть формы
editButton.addEventListener('click', () => openedPopup(editPopup));
addButton.addEventListener('click', () => openedPopup(addPopup));

//закрытие форм
closeButton.forEach((btn) => 
    btn.addEventListener('click', (evt) => 
closedPopup(evt.target.closest('.popup'))
));

//редактировать профиль 
saveButton.addEventListener('click', editInfo);


//добавление новой карточки
saveElementsButton.addEventListener('click', function () {
    const image = addPopup.querySelector('.popup__item_link');
    const caption = addPopup.querySelector('.popup__item_caption');

    addElements(image.value, caption.value);
    closedPopup(addPopup);
    image.value = '';
    caption.value = '';
});