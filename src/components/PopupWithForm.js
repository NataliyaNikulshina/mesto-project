import Popup from "../components/Popup.js";
import { popup } from "./Popup.js"

const forms = document.querySelectorAll('.popup__container')
//const inputs = document.querySelectorAll('.popup__item')

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

 /* _getInputValues() {
    inputs.forEach((input) => {
      console.log(input.value)
      return input.value
    })
  }*/

  setEventListeners() {
    super.setEventListeners();
    popup.forEach((popup) => {
      popup.addEventListener("submit", this._submitForm);
    })
  }

  close() {
    super.close();
    forms.forEach((form) => {
      form.reset();
    })
  }
}