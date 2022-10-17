export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl; 
    this._headers = headers; 
    this._mGet = 'GET';
    this._mPut = 'PUT';
    this._mPost = 'POST';
    this._mPatch = 'PATCH';
    this._mDel = 'DELETE';
  }

  _checkJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`There is an error: ${res.status}`);
  }

  _require(url, method, {data}) {
    if (method === 'GET' || method === 'DELETE'|| method === 'PUT') {
      console.log(`${this._baseUrl}${url}`)
      return fetch(`${this._baseUrl}${url}`, {
        method: method,
        headers: this._headers
      }).then(this._checkJson)
    } else {
      return fetch(`${this._baseUrl}${url}`, {
        method: method,
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
          avatar: data.avatar,
          about: data.about
        })
      }).then(this._checkJson)
    }
  }

  getUserInfo() {
    return this._require('users/me', this._mGet, {})
  }

  getStartCards() {
    return this._require('cards', this._mGet, {})
  }

  deleteCard(id) {
    return this._require(`cards/${id}`, this._mDel, {})
  }

  addLike(id) {
    return this._require(`cards/likes/${id}`, this._mPut, {})
  }

  delLike(id) {
    return this._require(`cards/likes/${id}`, this._mDel, {})
  }

  postNewCard(name, link) {
    const data = {name: name, link: link};
    return this._require('cards', this._mPost, {data})
  }

  editUserInfo(name, about) {
    const data = {name: name, about: about}
    return this._require('users/me', this._mPatch, {data})
  }

  editUserAvatar(avatar) {
    const data = {avatar: avatar};
    return this._require('users/me/avatar', this._mPatch, {data})
  }
}