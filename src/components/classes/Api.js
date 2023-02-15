class Api {
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
     }).then(checkResponse);
  }

  getProfileData () {
  return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers,
  }).then(checkResponse);
};

  
updateAvatar (avatarUrl) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    headers: this._headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(checkResponse);
};

updateProfileData (nameValue, aboutValue) {
  return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers,
    method: "PATCH",
    body: JSON.stringify({
      name: nameValue,
      about: aboutValue,
    }),
  }).then(checkResponse);
};

addCard (cardName, cardUrl) {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers,
    method: "POST",
    body: JSON.stringify({
      name: cardName,
      link: cardUrl,
    }),
  }).then(checkResponse);
};

toogleLikeCard (cardId, isLiked) {
  return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    headers: this._headers,
    method: isLiked ? "DELETE" : "PUT",
  }).then(checkResponse);
};

deleteCard (cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
    headers: this._headers,
    method: "DELETE",
  }).then(checkResponse);
};

}

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "3701fab1-1ed4-4420-a3e5-6e9ed2eab0d1",
    "Content-Type": "application/json",
  },
}); 


