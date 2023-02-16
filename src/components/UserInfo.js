// Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
// Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo.
//  Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
export default class UserInfo {
  constructor({ nameSelector, desctiptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(desctiptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement .textContent,
      description: this._descriptionElement .textContent,
    };
  }

  setUserInfo(name, description, avatar) {
    this._namev.textContent = name;
    this._descriptionElement .textContent = description;
    this._avatarElement.src = avatar;
  }
}
