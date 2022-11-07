import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(".popup__container");
    this._inputList = document.querySelectorAll(".popup__item");
  }

  _getInputValues() {
    this._inputs = {};
    this._inputList.forEach((input) => {
      this._inputs[input.name] = input.value;
    });
    return this._inputs;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  setEventListeners() {
    this._submit = this._handleSubmit.bind(this);
    this._popup.addEventListener("submit", this._submit);
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
