export default class Validator {
  constructor(
    {
      formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    form
  ) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
  }

  enableValidation() {
    this._setEventListeners()
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      const chekInputBind = this._checkInputValidity.bind(this); //чтоб не терять контекст в обработчике
      const toggleButtonBind = this._toggleButtonState.bind(this); //чтоб не терять контекст в обработчике
      this._form.addEventListener("reset", () => {
        setTimeout(() => {
          // из-за сетТаймаута обработчик уходит в конец стека и ждет когда завершится полная очистка формы
          toggleButtonBind();
        }, 0);
      });
      inputElement.addEventListener("input", function () {
        chekInputBind(inputElement);
        toggleButtonBind(inputElement);
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._addButtonDisabled(this._buttonElement);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    return errorElement;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
    return errorElement;
  }

  _addButtonDisabled (buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  };
}

//удаление ошибок при открытии формы///////// Пока не понимаю для чего это. Антон
const handleErrorOpenForm = (popup) => {
  const errorElements = Array.from(
    popup.querySelectorAll(".popup__input-error")
  );
  errorElements.forEach((errEl) => {
    errEl.textContent = "";
  });
  const inputElements = Array.from(popup.querySelectorAll(".popup__item"));
  inputElements.forEach((inpEl) => {
    inpEl.setCustomValidity("");
    inpEl.classList.remove(validationConfig.inputErrorClass);
  });
};
