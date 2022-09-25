const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image'); 
const altImage = popupImage.querySelector('.popup__caption');

//открытие формы
function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handlePopupEsc);
}

//закрытие формы
function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handlePopupEsc);
}

//закрытие формы, нажимая на Esc
function handlePopupEsc(evt) {
    if (evt.key === 'Escape') {
        // console.log(document.querySelector('.popup_opened'));
         closePopup(document.querySelector('.popup_opened'));}
}

//открытие формы с картинкой (будет вызываться из card.js, в index.js нельзя размещать)
function openPopupImage(img){
    openPopup(popupImage);
    imageInPopup.src = img.src;
    imageInPopup.alt = img.alt;
    altImage.textContent = img.alt;
}

export {openPopup, closePopup, openPopupImage};