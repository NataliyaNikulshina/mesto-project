const elementsContainer = document.querySelector('.elements');
const userName = document.querySelector('.profile__nickname');
const userAboutMe = document.querySelector('.profile__about-me');
const userAvatar = document.querySelector('.profile__avatar');

function addElement(element){
    elementsContainer.prepend(element);
}

function addAllElements(element){
    elementsContainer.append(element);
}

function removeElement(element){
    element.remove();
}

function createUserInfo(name, description, url) {
    userName.textContent = name;
    userAboutMe.textContent = description;
    userAvatar.src = url;
  }

function loadingForm(isLoading, evt) {
    const saveButton = evt.querySelector(".popup__button-save");
    if (isLoading) {
        saveButton.textContent = "Сохранение...";
      } else {
        saveButton.textContent = "Сохранить";
      }
}

export {loadingForm, addElement,  addAllElements, removeElement, createUserInfo, userName, userAboutMe};