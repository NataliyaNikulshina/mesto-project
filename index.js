const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__button-close');
const popups = document.querySelectorAll('.popup');

//открыть формы
function openedEditPopup(){
    editPopup.classList.add('popup_opened');
}

function openedAddPopup(){
    addPopup.classList.add('popup_opened');
}

editButton.addEventListener('click', openedEditPopup);
addButton.addEventListener('click', openedAddPopup);

//закрытие форм
function closedPopup(i){
    debugger;
    popups[i].classList.remove('popup_opened');
    console.log(i + ' ' + i);
}

closeButton.forEach((btn, i) => {
    btn.addEventListener('click', closedPopup(i))
})
debugger;



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
//console.log(nameInput.value);
//console.log(jobIntut.value);
}
saveButton.addEventListener('click', editInfo);



//лайк карточки
let likeButton = document.querySelectorAll('.element__like');
for (let i = 0; i < likeButton.length; i+=1){
function likeActive(){
    likeButton[i].classList.toggle('element__like_active');
}
likeButton[i].addEventListener('click', likeActive);
}