const elementsContainer = document.querySelector('.elements');
const userName = document.querySelector('.profile__nickname');
const userAboutMe = document.querySelector('.profile__about-me');
const userAvatar = document.querySelector('.profile__avatar');


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

export {loadingForm, assignUserInfo, userName, userAboutMe};