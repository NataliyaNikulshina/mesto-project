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
    //console.log (errorElement);
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
    //console.log(inputList);
    //console.log(buttonElement);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(objValidation.formSelector));
    //console.log(formList);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      const fieldsetList = Array.from(formElement.querySelectorAll(objValidation.fieldsetSelector));
      //console.log(fieldsetList);
      fieldsetList.forEach ((fieldSet) => {
       setEventListeners(fieldSet);
      });
    });
  };

import {enableValidation as objValidation} from "../pages/index.js";
export {hasInvalidInput, toggleButtonState, showInputError, hideInputError, setEventListeners, enableValidation};