const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "3701fab1-1ed4-4420-a3e5-6e9ed2eab0d1",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(checkResponse);
};

export const updateProfileData = (nameValue, aboutValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: nameValue,
      about: aboutValue,
    }),
  }).then(checkResponse);
};

export const addCard = (cardName, cardUrl) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: cardName,
      link: cardUrl,
    }),
  }).then(checkResponse);
};

export const toogleLikeCard = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: isLiked ? "DELETE" : "PUT",
  }).then(checkResponse);
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(checkResponse);
};
