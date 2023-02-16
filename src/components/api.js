export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

  getInitialCards() {
     return fetch(`${this._baseUrl}/cards`, {
       headers: this._headers,
     }).then(this._checkResponse);
  }

  getProfileData () {
  return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers,
  }).then(this._checkResponse);
};

  
updateAvatar (avatarUrl) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    headers: this._headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(this._checkResponse);
};

updateProfileData (nameValue, aboutValue) {
  return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers,
    method: "PATCH",
    body: JSON.stringify({
      name: nameValue,
      about: aboutValue,
    }),
  }).then(this._checkResponse);
};

addCard (cardName, cardUrl) {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers,
    method: "POST",
    body: JSON.stringify({
      name: cardName,
      link: cardUrl,
    }),
  }).then(this._checkResponse);
};

toogleLikeCard (cardId, isLiked) {
  return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    headers: this._headers,
    method: isLiked ? "DELETE" : "PUT",
  }).then(this._checkResponse);
};

deleteCard (cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
    headers: this._headers,
    method: "DELETE",
  }).then(this._checkResponse);
};

}


