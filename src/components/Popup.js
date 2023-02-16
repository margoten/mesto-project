// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
//  Модальное окно также закрывается при клике на затемнённую область вокруг формы.
export default class Popup {
  constructor(popupClass) {
    this._popupClass = popupClass;
    this._popupSelector = `.${this._popupClass}`;
    this._popup = document.querySelector(this._popupSelector);
    this._popupCloseButtonClass = "popup__close-button";
    this._openPopupClass = "popup_opened";
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains(this._popupClass) ||
        evt.target.classList.contains(this._popupCloseButtonClass)
      ) {
        this.close();
      }
    });
  }

  close() {
    this._popup.classList.remove(this._openPopupClass);
    document.body.removeEventListener("keydown", this._handleEscClose);
  }

  show() {
    this._popup.classList.add(this._openPopupClass);
    document.body.addEventListener("keydown", this._handleEscClose);
  }
}
