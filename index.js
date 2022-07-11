let editButton = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.popup_function_edit');
let addPopup = document.querySelector('.popup_function_add');
let closeButton = document.querySelector('.popup__button-close');
let addButton = document.querySelector('.profile__add-button');

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
    nameInput.value = '';
    jobIntut.value = '';
}

formElement.addEventListener('submit', formSubmitHandler);
closedPopup();
}

saveButton.addEventListener('click', editInfo);

console.log(saveButton);

console.log(nameInput);
console.log(jobIntut);