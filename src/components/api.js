import { createElement} from "./card.js";
import { addElement,  addAllElements, createUserInfo, userName, userAboutMe, loadingForm} from "./utils.js";
const avatar = document.querySelector('.profile__avatar');


const api = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "6ee9b7c2-d5d1-459a-bd50-5fb4d3293905",
    "Content-Type": "application/json",
  },
};

function jsonRes(res) {
  if (res.ok) {
    return res.json();
    
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function getUserInfo() {
  return fetch(`${api.baseUrl}/users/me`, {
    method: "GET",
    headers: api.headers,
  })
    .then((res) => jsonRes(res))
    .then((data) => {
      createUserInfo(data.name, data.about, data.avatar);
    })
    .catch((err) => console.log('ошибКа' + err));
}

export function getAllCards() {
  return fetch(`${api.baseUrl}/cards`, {
    method: "GET",
    headers: api.headers,
  })
    .then((res) => jsonRes(res))
    .then((data) => { 
      data.forEach((card) => {
        const cardInProfile = createElement(card.link, card.name, card._id, card.likes, card.owner);
        addAllElements(cardInProfile);
      //  console.log(data);
      //  console.log(card.likes);
     });
    })
    .catch((err) => console.log('ошибКа' + err));
}

export function postNewCards(link, name, evt) {
  return fetch(`${api.baseUrl}/cards`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
  .then((res) => jsonRes(res))
  .then((data) => {
   // console.log(data);
    const cardInProfile = createElement(data.link, data.name, data._id, data.likes, data.owner);
    addElement(cardInProfile);
  })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, evt);  
    });
}

export function deleteCard(id) {
  return fetch(`${api.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: api.headers,
    })
  .then((res) => jsonRes(res))
  .then((data) => {
    //console.log(data);
    
  })
    .catch((err) => console.log(err));
}

export function editUserInfo(name, about, evt) {
  return fetch(`${api.baseUrl}/users/me`, {
    method: "PATCH",
    headers: api.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
  .then((res) => jsonRes(res))
  .then((data) => {
    //console.log(data);
    userName.textContent = data.name;
    userAboutMe.textContent = data.about;
  })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, evt);  
    });;
}

export function editUserAvatar(link, evt) {
  return fetch(`${api.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: api.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
  .then((res) => jsonRes(res))
  .then((data) => {
   // console.log(data);
    avatar.src = data.link;
  })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingForm(false, evt);  
    });;
}

export function addLikes(id) {
  return fetch(`${api.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: api.headers,
  })
  .then((res) => jsonRes(res))
 // .then((data) => {
   // console.log(data);
 //   count.textContent = data.likes.length;
 // })
    .catch((err) => console.log(err));
}

export function deleteLikes(id) {
  return fetch(`${api.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: api.headers,
  })
  .then((res) => jsonRes(res))
 // .then((data) => {
   // console.log(data);
 //   count.textContent = data.likes.length;
 // })
    .catch((err) => console.log(err));
}