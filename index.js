let editButton = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.popup_type_edit');
let addPopup = document.querySelector('.popup_type_add');
let closeButton = document.querySelector('.popup__button-close');
let addButton = document.querySelector('.profile__add-button');
//открыть формы
function openedEditPopup(){
    editPopup.classList.add('popup_opened');
}

function openedAddPopup(){
    addPopup.classList.add('popup_opened');
}

function closedPopup(){
    editPopup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openedEditPopup);
closeButton.addEventListener('click', closedPopup);
addButton.addEventListener('click', openedAddPopup);



//редактировать профиль 
let saveButton = document.querySelector('.popup__button-save');

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
}
formElement.addEventListener('submit', formSubmitHandler);
closedPopup();
console.log(nameInput.value);
console.log(jobIntut.value);
}

saveButton.addEventListener('click', editInfo);

//лайк карточки
let likeButton = document.querySelectorAll('.element__like');
function likeActive(){
    let likeElement = document.querySelector('.element__like');
    likeElement.classList.toggle('element__like_active');
}
likeButton.addEventListener('click', likeActive);