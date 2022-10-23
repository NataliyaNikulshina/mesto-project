const popup = document.querySelectorAll('.popup');

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open(){
      this._popupSelector.classList.add('popup_opened');
      document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close(){
      this._popupSelector.classList.remove('popup_opened');
      document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    console.log(popup);
    popup.forEach((popup) => {
      popup.addEventListener("mousedown", (evt) => {
        if (
          evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('popup__button-close')
        ) {
          this.close();
        }
      });
    })
  }
}







