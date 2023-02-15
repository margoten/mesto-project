// Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
// Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo.
//  Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
class UserInfo {
  constructor({ nameSelector, desctiptionSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = desctiptionSelector;
    this._avatarSelector = avatarSelector;
    this.userId = null;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      description: this._descriptionSelector.textContent,
    };
  }

  setUserInfo({ name, description, avatar, userId }) {
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = description;
    this._avatarSelector.src = avatar;
    this._userId = userId;
  }
}
