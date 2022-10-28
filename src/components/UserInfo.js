export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector, setUserInfo}) {
      this._userName = document.querySelector(nameSelector);
      this._aboutUser = document.querySelector(aboutSelector);
      this._avatarUser = document.querySelector(avatarSelector);
      this._id = '';
      this._setUserInfo = setUserInfo;
    }

  getUserInfo(user) {
      console.log(this._userName, this._aboutUser, this._avatarUser, this._id);
      this._userName.textContent = user.name;
      this._aboutUser.textContent = user.about;
      this._avatarUser.src = user.avatar;
      this._id = user._id;
    }

  setUserAvatar(newAvatar) {
      this._avatarUser.src = newAvatar;
    }

  setUserInfo(name, about){
      this._userName.textContent = name;
      this._aboutUser.textContent = about;
  }
}