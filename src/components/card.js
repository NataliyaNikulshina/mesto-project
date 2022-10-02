import {openPopupImage} from './modal.js'; 
import {Id_user} from './utils.js'; 
import {addLikes, deleteLikes, deleteCard} from './api.js'; 

const elementsTemplate = document.querySelector('#element-template').content;

function handleElementLike(count, like, el){
if (!(like.classList.contains('element__like_active'))){
    addLikes(el, count)
        .then(res => {
            like.classList.toggle('element__like_active');
            count.textContent = res.likes.length;
        })
        .catch((err) => console.log(err));
   } else {
    deleteLikes(el, count)
    .then(res => {
        like.classList.toggle('element__like_active');
        count.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
   }
}

function handleElementDelete(del, el){
    deleteCard(el)
        .then((data) => {
            //console.log(data);
            removeElement(del.closest('.element'))
        })
        .catch((err) => console.log(err));  
}

function removeElement(element){
    element.remove();
}

//создание новой карточки
function createElement(linkValue, captionValue, idValue, likesValue, ownerValue){
    const element = elementsTemplate.querySelector('.element').cloneNode(true);
    const imageElement = element.querySelector('.element__image');
    const countLike = element.querySelector('.element__like-count');
    const buttonLike = element.querySelector('.element__like');
    const buttonTrash = element.querySelector('.element__trash');
    countLike.textContent = likesValue.length;

    if (ownerValue._id === Id_user){
        buttonTrash.classList.add('element__trash_active');
    }

    likesValue.forEach((el) => {
    if (el._id === Id_user) {
        buttonLike.classList.add('element__like_active');
    }});

    imageElement.src = linkValue;
    imageElement.alt = captionValue;
    element.querySelector('.element__caption').textContent = captionValue;
//добавление лайков
    element.querySelector('.element__like').addEventListener('click', function(){handleElementLike(countLike, buttonLike, idValue)});
//добавление корзины
    element.querySelector('.element__trash').addEventListener('click', function(){handleElementDelete(buttonTrash, idValue)});
//открытие изображения карточки
    imageElement.addEventListener('click', function(){
        openPopupImage(imageElement)
    });
  //  console.log('это кардс ' +imageElement);
    return(element);
}

export {handleElementLike, handleElementDelete, createElement};