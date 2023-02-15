// Создайте класс PopupWithForm, который наследуется от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners.
// Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._nameElement = this._popup.querySelector(".popup__input_data_name");
    this._descriptionElement = this._popup.querySelector(
      ".popup__input_data_description"
    );
  }

  _getInputValues() {
    return {
      dataName: this._nameElement.textContent,
      dataDescription: this._descriptionElement.textContent,
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmitCallback);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
