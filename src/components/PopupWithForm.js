import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__container')
  }

 /* _getInputValues() {
    inputs.forEach((input) => {
      const inputs = document.querySelectorAll('.popup__item')
      console.log(input.value)
      return input.value
    })
  }*/

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}