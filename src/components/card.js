
import {Id_user} from './utils.js'; 
import {addLikes, deleteLikes, deleteCard} from './api.js'; 

export default class Card {
   constructor(data, elementsTemplate){
    this.name = data.name;
    this.link = data.link;
    this.elementsTemplate = elementsTemplate;
    this.cardID = data._id;
    this.Id_user = Id_user;
    this.likes = data.likes;
   } 

   _getElement() {
    this.element = document
      .querySelector(this.elementsTemplate)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return this.element;
   }

   removeElement(){
    this.element.remove();
    this._element = null;
   }

   handleElementDelete(del, el){
    deleteCard(el)
        .then((data) => {
            console.log('remove' + data);
            removeElement(del.closest('.element'))
        })
        .catch((err) => console.log(err));  
   }

   handleElementLike(count, like, el){
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

   createCard(){
    this._card = this.element;
    console.log(this._card);
    this._imageElement = element.querySelector('.element__image');
    this._countLike = element.querySelector('.element__like-count');
    this._buttonLike = element.querySelector('.element__like');
    this._buttonTrash = element.querySelector('.element__trash');
    this._cardHeading = element.querySelector('.element__caption');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._countLike.textContent = this._likes.length;
    this._cardHeading.textContent = this._name;
   // this._setButtonTrashState();
   // this._setLikeState();
  //  this._setEventListeners();
    console.log(this._card);
    return this._card;
   }

   _setEventListeners() {
        this._buttonTrash
            .addEventListener('click', () => this._handleElementDelete());
        this._buttonLike
            .addEventListener('click', () => this._handleElementLike());
        this._imageElement
            .addEventListener('click', () => {
                openPopupImage(imageElement)
        });
   }

   _setButtonTrashState() {
    if (ownerValue._id === this.Id_user) {
      this._buttonTrash.classList.add('element__trash_active');
    }
  }

   _setButtonLikeState() {
    likesValue.forEach((el) => {
        if (el._id === this.Id_user) {
            this._buttonLike.classList.add('element__like_active');
        }});
  }

}




/*
console.log(element);
//const elementsTemplate = document.querySelector('#element-template').content;

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
function createElement(linkValue, captionValue, idValue, likesValue, ownerValue, openPopupImage){
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

export {handleElementLike, handleElementDelete, createElement};*/