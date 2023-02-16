// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создавайте экземпляр класса FormValidator.
export default class FormValidator {
  constructor(obj, form) {
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(obj.inputSelector)
    );
    this._buttonElement = this._form.querySelector(obj.submitButtonSelector);
    this._errorClass = obj.errorClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._inactiveButtonClass = obj.inactiveButtonClass;``
  }

  _showInputError(errorElement, inputElement, errorMessage) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(errorElement, inputElement) {
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(
        errorElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._form.addEventListener("reset", (evt) => {
      this._resetFormStates();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  _resetFormStates() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._form.querySelector(
        `.${inputElement.id}-error`
      );
      this._hideInputError(errorElement, inputElement);
    });
    setTimeout(() => {
      this._toggleButtonState();
    }, 0);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
