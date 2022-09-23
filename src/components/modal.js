function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handlePopupEsc);
}

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
 

export {openPopup, closePopup};