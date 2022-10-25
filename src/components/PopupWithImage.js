import Popup from "../components/Popup.js";
import { popupImageCaption, popupImage  } from "./variables.js";

export default class PopupWithImage extends Popup {
  constructor({name, link}, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._url = link;
  }

  open() {
    super.open();
    popupImage.src = this._url;
    popupImage.alt = this._name;
    popupImageCaption.textContent = this._name;
  }
}

