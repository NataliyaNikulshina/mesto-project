const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image'); 
const altImage = popupImage.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__button-close');
const popups = document.querySelectorAll(".popup");

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

//закрытие форм по кнопке "Закрыть" 
closeButtons.forEach((btn) =>  
    btn.addEventListener('click', (evt) =>  
closePopup(evt.target.closest('.popup')) 
)); 

//закрытие формы по клику на оверлей
popups.forEach(function(popup) {
    popup.addEventListener('mouseup', function(evt){
    if(evt.target.classList.contains('popup')){
       // console.log(evt.target);
       // console.log(evt.target.closest('.popup'));
        closePopup(evt.target.closest('.popup'));}
    });
});

//открытие формы с картинкой (будет вызываться из card.js, в index.js нельзя размещать)
function openPopupImage(img){
    openPopup(popupImage);
    imageInPopup.src = img.src;
    imageInPopup.alt = img.alt;
    altImage.textContent = img.alt;
}

export {openPopup, closePopup, openPopupImage};