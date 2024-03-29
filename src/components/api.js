const api = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "6ee9b7c2-d5d1-459a-bd50-5fb4d3293905",
    "Content-Type": "application/json",
  },
};

function checkJson(res) {
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
    .then((res) => checkJson(res));
}

export function getAllCards() {
  return fetch(`${api.baseUrl}/cards`, {
    method: "GET",
    headers: api.headers,
  })
    .then((res) => checkJson(res));
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
  .then((res) => checkJson(res));
}

export function deleteCard(id) {
  return fetch(`${api.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: api.headers,
    })
  .then((res) => checkJson(res))
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
  .then((res) => checkJson(res));
}

export function editUserAvatar(link) {
  return fetch(`${api.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: api.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
  .then((res) => checkJson(res));
}

export function addLikes(id) {
  return fetch(`${api.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: api.headers,
  })
  .then((res) => checkJson(res));
}

export function deleteLikes(id) {
  return fetch(`${api.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: api.headers,
  })
  .then((res) => checkJson(res));
}