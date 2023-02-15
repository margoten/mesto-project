// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
//  Модальное окно также закрывается при клике на затемнённую область вокруг формы.
class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._openPopupClass = "popup_opened";
    this._popupCloseButtonClass = "popup__close-button";
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains(this._popupSelector) ||
        evt.target.classList.contains(this._popupCloseButtonClass)
      ) {
        close();
      }
    });
  }

  close() {
    this.popup.classList.remove(openPopupClass);
    document.body.removeEventListener("keydown", this._handleEscClose);
  }

  show() {
    this.popup.classList.add(openPopupClass);
    document.body.addEventListener("keydown", this._handleEscClose);
  }
}
