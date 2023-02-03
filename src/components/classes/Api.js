class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
        return fetch().then()
    // ...
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
}); 