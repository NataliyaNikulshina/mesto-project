import Popup from "../components/Popup.js";

export const popupImage = document.querySelector('.popup_type_image');
export const imageInPopup = popupImage.querySelector('.popup__image');
export const altImage = popupImage.querySelector('.popup__caption');

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    super.open();
    imageInPopup.src = evt.target.src;
    imageInPopup.alt = evt.target.alt;
    altImage.textContent = evt.target.alt;
  }
}

