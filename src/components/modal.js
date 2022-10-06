import { addPlace } from "./card.js";

let popupSelectors;

function keyDownPopupListener (evt) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
};

const closePopup = (popup) => {
  popup.classList.remove(popupSelectors.openPopupClass);
  popup.removeEventListener("keydown", keyDownPopupListener);
  const formElement = popup.querySelector(popupSelectors.formSelector);
  if (formElement) {
    formElement.reset();
  }
};

export const showPopup = (popup) => {
  popup.classList.add(popupSelectors.openPopupClass);
  popup.addEventListener("keydown", keyDownPopupListener);
};

export const initPopupEvets = () => {
  // document.body.addEventListener("keydown", (evt) => {
  //   if (evt.key == "Escape") {
  //     document
  //       .querySelectorAll(popupSelectors.openPopupClass)
  //       .forEach((popup) => {
  //         closePopup(popup);
  //       });
  //   }
  // });

  document
    .querySelectorAll(popupSelectors.popupContentSelector)
    .forEach((popup) => {
      popup.addEventListener("click", (evt) => {
        evt.stopPropagation();
      });
    });
  document.querySelectorAll(popupSelectors.popupSelector).forEach((popup) => {
    popup.addEventListener("click", () => {
      closePopup(popup);
    });
  });
};

const initProfilePopup = (
  popupProfileSelector,
  profileNameSelector,
  profileJobSelector
) => {
  const popupProfile = document.querySelector(popupProfileSelector);
  const profileNameElement = document.querySelector(profileNameSelector);
  const profileJobElement = document.querySelector(profileJobSelector);
  const nameElement = popupProfile.querySelector(
    popupSelectors.inputDataNameSelector
  );
  const jobElement = popupProfile.querySelector(
    popupSelectors.inputDataDescrSelector
  );

  const button = document.querySelector(
    popupSelectors.profileEditButtonSelector
  );
  button.addEventListener("click", () =>
    editProfileButtonEvent(
      popupProfile,
      nameElement,
      jobElement,
      profileNameElement,
      profileJobElement
    )
  );

  const formElement = popupProfile.querySelector(popupSelectors.formSelector);
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileFormSubmitEvent(
      popupProfile,
      nameElement,
      jobElement,
      profileNameElement,
      profileJobElement
    );
  });
};

const initPlacePopup = (popupPlaceSelector) => {
  const popupPlace = document.querySelector(popupPlaceSelector);
  const nameElement = popupPlace.querySelector(
    popupSelectors.inputDataNameSelector
  );
  const linkElement = popupPlace.querySelector(
    popupSelectors.inputDataDescrSelector
  );

  const button = document.querySelector(
    popupSelectors.profileAddButtonSelector
  );
  button.addEventListener("click", () => showPopup(popupPlace));

  const formElement = popupPlace.querySelector(popupSelectors.formSelector);
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    placeFormSubmitEvent(
      popupPlace,
      formElement,
      nameElement.value,
      linkElement.value
    );
  });
};

const editProfileButtonEvent = (
  popup,
  nameElement,
  jobElement,
  profileNameElement,
  profileJobElement
) => {
  nameElement.value = profileNameElement.textContent;
  jobElement.value = profileJobElement.textContent;
  showPopup(popup);
};

const profileFormSubmitEvent = (
  popup,
  nameElement,
  jobElement,
  profileNameElement,
  profileJobElement
) => {
  profileNameElement.textContent = nameElement.value;
  profileJobElement.textContent = jobElement.value;
  closePopup(popup);
};

const placeFormSubmitEvent = (popup, formElement, name, link) => {
  addPlace(name, link, places);
  closePopup(popup);
  formElement.reset();
};

export const enableModal = (obj) => {
  popupSelectors = obj;
  initProfilePopup(
    popupSelectors.popupProfileSelector,
    popupSelectors.profileNameSelector,
    popupSelectors.profileJobSelector
  );
  initPlacePopup(popupSelectors.popupPlaceSelector);
  const closeButtons = document.querySelectorAll(
    popupSelectors.popupCloseButton
  );
  closeButtons.forEach((button) => {
    button.addEventListener("click", () =>
      closePopup(button.closest(popupSelectors.popupSelector))
    );
  });
  initPopupEvets();
};
