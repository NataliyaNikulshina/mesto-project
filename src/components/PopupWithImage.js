import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageCaption = this._popup.querySelector(".popup__caption");
  }

  open({name, link}) {
    this._name = name;
    this._url = link;
    this._popupImage.src = this._url;
    this._popupImage.alt = this._name;
    this._popupImageCaption.textContent = this._name;
    super.open();
  }
}

