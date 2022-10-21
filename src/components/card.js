

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
 