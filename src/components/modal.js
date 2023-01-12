const openPopupClass = "popup_opened"; 

function handleEscapeKeyDownListener(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(`.${openPopupClass}`);
    closePopup(popup);
  }
}

function hanleOverlayListener(evt) {
  closePopup(evt.target);
}

export const closePopup = (popup) => {
  popup.classList.remove(openPopupClass);
  document.body.removeEventListener("keydown", handleEscapeKeyDownListener);
  popup.removeEventListener("mousedown", hanleOverlayListener);
};

export const showPopup = (popup) => {
  popup.classList.add(openPopupClass);
  document.body.addEventListener("keydown", handleEscapeKeyDownListener);
  popup.addEventListener("mousedown", hanleOverlayListener);
};

export const enableModal = (obj) => {
  const closeButtons = document.querySelectorAll(obj.popupCloseButton);
  closeButtons.forEach((button) => {
    button.addEventListener("click", () =>
      closePopup(button.closest(obj.popupSelector))
    );
  });

  document
    .querySelectorAll(obj.popupContentSelector)
    .forEach((content) => {
      content.addEventListener("click", (evt) => {
        evt.stopPropagation();
      });
    });
};
