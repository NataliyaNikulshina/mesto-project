const elementsContainer = document.querySelector('.elements');
const userName = document.querySelector('.profile__nickname');
const userAboutMe = document.querySelector('.profile__about-me');
const userAvatar = document.querySelector('.profile__avatar');

function addElement(element){
    elementsContainer.prepend(element);
}

function removeElement(element){
    element.remove();
}

function createUserInfo(name, description, url) {
    userName.textContent = name;
    userAboutMe.textContent = description;
    userAvatar.src = url;
  }

export {addElement, removeElement, createUserInfo, userName, userAboutMe};