import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({submitForm}, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__container")
    this._inputList = document.querySelectorAll(".popup__item");
  }

  _getInputValues() {
    this._inputs = {};
    this._inputList.forEach((input) => {
      this._inputs[input.name] = input.value;
    });
    return this._inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}