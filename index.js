const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__button-close');
const elementsContainer = document.querySelector('.elements');


//открыть формы
function openedPopup(popup){
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', () => openedPopup(editPopup));
addButton.addEventListener('click', () => openedPopup(addPopup));

//закрытие форм
function closedPopup(popup){
    popup.classList.remove('popup_opened');
}

closeButton.forEach((btn) => 
    btn.addEventListener('click', (evt) => 
closedPopup(evt.target.closest('.popup'))
));


//редактировать профиль 
const saveButton = document.querySelector('.popup__button-save');

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

//console.log(nameInput.value);
//console.log(jobIntut.value);
}
saveButton.addEventListener('click', editInfo);



//лайк карточки
const likeButton = document.querySelectorAll('.element__like');
for (let i = 0; i < likeButton.length; i+=1){
function likeActive(){
    likeButton[i].classList.toggle('element__like_active');
}
likeButton[i].addEventListener('click', likeActive);
}

//добавление карточки
function addElements(linkValue, captionValue){
    const elementsTemplate = document.querySelector('#element-template').content;
    const element = elementsTemplate.querySelector('.element').cloneNode(true);

    element.querySelector('.element__image').src = linkValue;
    element.querySelector('.element__caption').textContent = captionValue;

    element.querySelector('.element__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_active');
    });
    elementsContainer.prepend(element);
    
}

const saveElementsButton = document.querySelector('.popup__button-save_cards');

saveElementsButton.addEventListener('click', function () {
    const image = addPopup.querySelector('.popup__item_link');
    const caption = addPopup.querySelector('.popup__item_caption');

    addElements(image.value, caption.value);
    closedPopup(addPopup);
    image.value = '';
    caption.value = '';

});
    
//удаление карточки