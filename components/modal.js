

function openImage(img){
    openPopup(imagePopup);
    imageInPopup.src = img.src;
    imageInPopup.alt = img.alt;
    altImage.textContent = img.alt;
}

function handleProfileFormSubmit(evt){
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userAboutMe.textContent = aboutMeInput.value;
    closePopup(editPopup);
}

function handleAvatarFormSubmit(evt){
    evt.preventDefault();
    const avatarNew = editAvatar.querySelector('.popup__item_type_avatar');
    avatar.src = avatarNew.value;
   // console.log(avatarNew.value);
    closePopup(editAvatar);
}

function handleAddCardsFormSubmit(evt){
    evt.preventDefault();
    const cardNew = createElement(image.value, caption.value);
    addElement(cardNew);
    closePopup(addPopup);
    formAddCards.reset();
}
import {imageInPopup, imagePopup, altImage, userName, userAboutMe, nameInput, aboutMeInput, editAvatar, avatar, addPopup, formAddCards} from './index.js'; 
import {openPopup, closePopup, addElement} from './utils.js'; 
export {openImage, handleProfileFormSubmit, handleAvatarFormSubmit, handleAddCardsFormSubmit};