
//import {Id_user} from './utils.js'; 
//import {addLikes, deleteLikes, deleteCard} from './api.js'; 

export default class Card {
    constructor({data, handleAddLike, handleDelLike, handleDelCard}, cardTemplateSelector) {
        this._likes = data.likes;
        this._name = data.name;
        this._link = data.link;
        this._id = data.owner._id;
        this._cardId = data._id;
        this._handleAddLike = handleAddLike;
        this._handleDelLike = handleDelLike;
        this._handleDelCard = handleDelCard;
        this._template = cardTemplateSelector;
    }

   _getElement() {
      return this._template.content.querySelector('.element').cloneNode(true);
   }

   createCard(userId){
    this._card = this._getElement();
    this._imageElement = this._card.querySelector('.element__image');
    this._countLike = this._card.querySelector('.element__like-count');
    this._buttonLike = this._card.querySelector('.element__like');
    this._buttonTrash = this._card.querySelector('.element__trash');
    this._cardHeading = this._card.querySelector('.element__caption');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._countLike.textContent = this._likes.length;
    this._cardHeading.textContent = this._name;
    this._setButtonTrashState(userId);
    this._setButtonLikeState(userId);
    this._setEventListeners();
   // console.log(this._card);
    return this._card;
   }

   _setEventListeners() {
        this._buttonTrash
            .addEventListener('click', () => this._pressButtonDelete());
        this._buttonLike
            .addEventListener('click', () => this._pressButtonsLike());
        
      //  this._imageElement
      //      .addEventListener('click', () => {
      //          openPopupImage(imageElement)
      //  });
   }

   _pressButtonsLike() {
    if (this._buttonLike.classList.contains('element__like_active')) {
      this._handleDelLike(this._cardId, this._countLike, this._buttonLike);
    } else {
      this._handleAddLike(this._cardId, this._countLike, this._buttonLike);
    }
  }

  _pressButtonDelete() {
    this._handleDelCard(this._cardId, this._card);
  }

   _setButtonTrashState(id) {
   // if (ownerValue._id === this.Id_user) {
   //   this._buttonTrash.classList.add('element__trash_active');
   // }
   if (id === this._id) {
    this._buttonTrash.classList.add('element__trash_active');
  }
  }

   _setButtonLikeState(id) {
   // likesValue.forEach((el) => {
   //     if (el._id === this.Id_user) {
   //         this._buttonLike.classList.add('element__like_active');
   //     }});
   this._likes.forEach((like) => {
    if (like._id === id) {
      this._buttonLike.classList.add('element__like_active');
      return true
    } else {return false}
  });
  }

   

}
   /*
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
/*




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