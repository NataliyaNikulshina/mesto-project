

function handleElementLike(evt){
    evt.target.classList.toggle('element__like_active')
}

function handleElementDelete(evt){
    removeElement(evt.target.closest('.element'))
}

function createElement(linkValue, captionValue){
    const element = elementsTemplate.querySelector('.element').cloneNode(true);
    const imageElement = element.querySelector('.element__image');
    imageElement.src = linkValue;
    imageElement.alt = captionValue;
    element.querySelector('.element__caption').textContent = captionValue;
//добавление лайков
    element.querySelector('.element__like').addEventListener('click', handleElementLike);
//добавление корзины
    element.querySelector('.element__trash').addEventListener('click', handleElementDelete);
//открытие изображения карточки
    imageElement.addEventListener('click', function(){
        openImage(imageElement)
    });
    return(element);
}

import {elementsTemplate} from './index.js'; 
import {removeElement} from './utils.js'; 
import {openImage} from './modal.js';
export {handleElementLike, handleElementDelete, createElement};