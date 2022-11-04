export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._userName = document.querySelector(name);
    this._userAbout = document.querySelector(about);
    this._userAvatar = document.querySelector(avatar);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName,
      about: this._userAbout,
    }
    return this._userInfo;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._userId = data._id;
  }

  getUserId() {
    return this._userId;
  }
}

