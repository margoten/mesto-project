const openPopupClass = "popup_opened";

function handleEscapeKeyDownListener(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(`.${openPopupClass}`);
    closePopup(popup);
  }
}

export const closePopup = (popup) => {
  popup.classList.remove(openPopupClass);
  document.body.removeEventListener("keydown", handleEscapeKeyDownListener);
};

export const showPopup = (popup) => {
  popup.classList.add(openPopupClass);
  document.body.addEventListener("keydown", handleEscapeKeyDownListener);
};

export const enableModal = () => {
  const popupClass = "popup";
  const popupContentSelector = ".popup_content";
  const popupCloseButtonClass = "popup__close-button";
  const popups = document.querySelectorAll(`.${popupClass}`);
  popups.forEach((popup) =>
    popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains(popupClass) ||
        evt.target.classList.contains(popupCloseButtonClass)
      ) {
        closePopup(popup);
      }
    })
  );
};
