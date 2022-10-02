const elementsContainer = document.querySelector('.elements');
const userName = document.querySelector('.profile__nickname');
const userAboutMe = document.querySelector('.profile__about-me');
const userAvatar = document.querySelector('.profile__avatar');
let Id_user = '';

function addElement(element){
    elementsContainer.prepend(element);
}

function addAllElements(element){
    elementsContainer.append(element);
}



function createUserInfo(name, description, url, myId) {
    userName.textContent = name;
    userAboutMe.textContent = description;
    userAvatar.src = url;
    Id_user = myId;
  }

function assignUserInfo(name, about) {
    userName.textContent = name;
    userAboutMe.textContent = about;
  }

function loadingForm(isLoading, evt) {
    const saveButton = evt.querySelector(".popup__button-save");
    if (isLoading) {
        saveButton.textContent = "Сохранение...";
      } else {
        saveButton.textContent = "Сохранить";
      }
}

export {loadingForm, addElement,  addAllElements, createUserInfo, assignUserInfo, userName, userAboutMe, Id_user};