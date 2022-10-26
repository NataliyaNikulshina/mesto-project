import { data } from "autoprefixer";

export default class UserInfo {
  constructor({nameSelector, aboutSelector, dataApi}) {
      this._userName = document.querySelector(nameSelector);
      this._aboutUser = document.querySelector(aboutSelector);
      this._data = dataApi;
    }

  getUserInfo() {
      return this._userInfo;
    }

  setUserAvatar() {
      this._avatarUser.src = this.getUserInfo().avatar;
    }

  setUserInfo(){
      this._userName.textContent = this._data.name;
      this._aboutUser.textContent = this._data.about;
  }
}