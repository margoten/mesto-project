const showInputError = (
  errorElement,
  inputElement,
  errorMessage,
  errorClass,
  inputErrorClass
) => {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
};

const hideInputError = (
  errorElement,
  inputElement,
  errorClass,
  inputErrorClass
) => {
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
  inputElement.classList.remove(inputErrorClass);
};

const checkInputValidity = (
  formElement,
  inputElement,
  errorClass,
  inputErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      errorElement,
      inputElement,
      inputElement.validationMessage,
      errorClass,
      inputErrorClass
    );
  } else {
    hideInputError(errorElement, inputElement, errorClass, inputErrorClass);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (
  inputList,
  formElement,
  buttonElement,
  errorClass,
  inputErrorClass,
  inactiveButtonClass
) => {  
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  formElement.addEventListener("reset", (evt) => {
    resetFormStates(
      formElement,
      inputList,
      buttonElement,
      errorClass,
      inputErrorClass,
      inactiveButtonClass
    );
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        errorClass,
        inputErrorClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

export const resetFormStates = (
  formElement,
  inputList,
  buttonElement,
  errorClass,
  inputErrorClass,
  inactiveButtonClass
) => {
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    hideInputError(errorElement, inputElement, errorClass, inputErrorClass);
  });
  setTimeout(() => {
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  }, 0);
};

export const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(obj.inputSelector)
    );
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    setEventListeners(
      inputList,
      formElement,
      buttonElement,
      obj.errorClass,
      obj.inputErrorClass,
      obj.inactiveButtonClass
    );
  });
};
