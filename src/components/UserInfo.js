export default class UserInfo {
    constructor({nameSelector, aboutSelector, avatarSelector, editUserInfo}) {
        this._userName = document.querySelector(nameSelector);
        this._aboutUser = document.querySelector(aboutSelector);
        this._avatarUser = document.querySelector(avatarSelector);
        this._id = null;
        this._editUserInfo = editUserInfo;
      }

    createUserInfo (user) {
        console.log(this._userName, this._aboutUser, this._avatarUser, this._id);
        this._userName.textContent = user.name;
        this._aboutUser.textContent = user.about;
        this._avatarUser.src = user.img;
        this._id = user._id;
      }
    
    createUserAvatar(newAvatar) {
        this._avatarUser.src = newAvatar;
      }
    
    editUserInfo(name, about){
        this._userName.textContent = name;
        this._aboutUser.textContent = about;
    }
}