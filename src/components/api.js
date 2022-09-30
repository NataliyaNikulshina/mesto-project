

/*function checkResponse (res){
  if (res.ok) {
    //return res.json();
    console.log('ляля');
  }
  return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
}

export const api = new Api(function (cohortId, token){
    return fetch(`https://nomoreparties.co/v1/${cohortId}`, {
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    }
})
.then((res) => checkResponse(res))
.then((result) => {
  console.log(result);
}); 
});


export const allCards = new GetAllCards (function (cohortId, token) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify('')
})
.then(checkResponse(res))
.then((result) => {
  console.log(result);
}); 
});*/
import { createElement} from "./card.js";
import { addElement,  addAllElements, createUserInfo, userName, userAboutMe} from "./utils.js";
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
        const cardInProfile = createElement(card.link, card.name);
        addAllElements(cardInProfile);
      //  console.log(cardInProfile);
     });
    })
    .catch((err) => console.log('ошибКа' + err));
}

export function postNewCards(link, name) {
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
    //console.log(data);
    const cardInProfile = createElement(data.link, data.name);
    addElement(cardInProfile);
  })
    .catch((err) => console.log(err));
}

export function editUserInfo(name, about) {
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
    .catch((err) => console.log(err));
}

export function editUserAvatar(link) {
  return fetch(`${api.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: api.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
  .then((res) => jsonRes(res))
  .then((data) => {
    console.log(data);
    avatar.src = data.link;
  })
    .catch((err) => console.log(err));
}