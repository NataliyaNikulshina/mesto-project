function openPopup(popup){
    popup.classList.add('popup_opened');
}

function closePopup(popup){
    popup.classList.remove('popup_opened');
}

function addElement(element){
    elementsContainer.prepend(element);
}

function removeElement(element){
    element.remove();
}
import {elementsContainer} from './index.js'; 
export {openPopup, closePopup, addElement, removeElement};