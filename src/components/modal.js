let modalInfo;

function keyDownPopupListener(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(`.${modalInfo.openPopupClass}`);
    closePopup(popup);
  }
}

function clickPopupListener(evt) {
  closePopup(evt.target);
}

export const closePopup = (popup) => {
  popup.classList.remove(modalInfo.openPopupClass);
  document.body.removeEventListener("keydown", keyDownPopupListener);
  popup.removeEventListener("click", clickPopupListener);
  const formElement = popup.querySelector(modalInfo.formSelector);
  if (formElement) {
    formElement.reset();
  }
};

export const showPopup = (popup) => {
  popup.classList.add(modalInfo.openPopupClass);
  document.body.addEventListener("keydown", keyDownPopupListener);
  popup.addEventListener("click", clickPopupListener);
};

export const enableModal = (obj) => {
  modalInfo = obj;
  const closeButtons = document.querySelectorAll(modalInfo.popupCloseButton);
  closeButtons.forEach((button) => {
    button.addEventListener("click", () =>
      closePopup(button.closest(modalInfo.popupSelector))
    );
  });

  document
    .querySelectorAll(modalInfo.popupContentSelector)
    .forEach((content) => {
      content.addEventListener("click", (evt) => {
        evt.stopPropagation();
      });
    });
};
