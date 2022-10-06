let validationInfo;

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationInfo.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationInfo.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationInfo.inputErrorClass);
  errorElement.classList.remove(validationInfo.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationInfo.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationInfo.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationInfo.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationInfo.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  toggleButtonState(inputList, buttonElement);
};

const clearAllErrors = ((formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationInfo.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationInfo.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
});

export const enableValidation = (obj) => {
  validationInfo = obj;
  const formList = Array.from(
    document.querySelectorAll(validationInfo.formSelector)
  );
  formList.forEach((formElement) => {
    console.log(formElement);
    formElement.addEventListener("submit", evt => {
      evt.preventDefault();
    });

    formElement.addEventListener("reset", evt => {
      clearAllErrors(evt.target);
    })

    setEventListeners(formElement);
  });
};
