

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(objValidation.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
      }
    else {
        buttonElement.classList.remove(objValidation.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
      }
  }
  
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(objValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objValidation.errorClass);
  };
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(objValidation.inputErrorClass);
    errorElement.classList.remove(objValidation.errorClass);
    errorElement.textContent = '';
  };
  
const checkInputValidity = (formElement, inputElement) => {
  console.log('должен вывести патерн ' + inputElement.validity.patternMismatch );
  console.log('валид ' + inputElement.validity.valid );
  console.log(inputElement.validity);
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    } 
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } 
    else {
      hideInputError(formElement, inputElement);
    }
  };
  
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(objValidation.inputSelector));
    const buttonElement = formElement.querySelector(objValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    })
};
  
export const objValidation = ({
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__user-info',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
}); 

export const enableValidation = (objValidation) => {
    const formList = Array.from(document.querySelectorAll(objValidation.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      const fieldsetList = Array.from(formElement.querySelectorAll(objValidation.fieldsetSelector));
      fieldsetList.forEach ((fieldSet) => {
       setEventListeners(fieldSet);
      });
    });
  };

 