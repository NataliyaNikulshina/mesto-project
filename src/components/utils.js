const elementsContainer = document.querySelector('.elements');
const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image'); 
const altImage = popupImage.querySelector('.popup__caption');


function addElement(element){
    elementsContainer.prepend(element);
}

function removeElement(element){
    element.remove();
}

function openPopupImage(img){
    openPopup(popupImage);
    imageInPopup.src = img.src;
    imageInPopup.alt = img.alt;
    altImage.textContent = img.alt;
}

export {addElement, removeElement, openPopupImage};