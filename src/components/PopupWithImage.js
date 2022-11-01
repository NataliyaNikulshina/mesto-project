import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageCaption = this._popup.querySelector(".popup__caption");
  }

  open(evt) {
    this._popupImage.src = evt.target.src;
    this._popupImage.alt = evt.target.textContent;
    this._popupImageCaption.textContent = evt.target.textContent;
    super.open();
  }
}

