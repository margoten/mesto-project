import { addPlace } from "./card.js";
import { resetFormStates } from "./validate.js";

let popupSelectors;

function keyDownPopupListener(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(`.${popupSelectors.openPopupClass}`);
    closePopup(popup);
  }
}

function clickPopupListener(evt) {
  closePopup(evt.target);
}

const closePopup = (popup) => {
  popup.classList.remove(popupSelectors.openPopupClass);
  document.body.removeEventListener("keydown", keyDownPopupListener);
  popup.removeEventListener("click", clickPopupListener);
  const formElement = popup.querySelector(popupSelectors.formSelector);
  if (formElement) {
    formElement.reset();
  }
};

export const showPopup = (popup) => {
  popup.classList.add(popupSelectors.openPopupClass);
  document.body.addEventListener("keydown", keyDownPopupListener);
  popup.addEventListener("click", clickPopupListener);
};

const editProfileButtonEvent = (
  popup,
  nameElement,
  jobElement,
  profileNameElement,
  profileJobElement,
  formElement
) => {
  nameElement.value = profileNameElement.textContent;
  jobElement.value = profileJobElement.textContent;
  resetFormStates(formElement);
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
  const formElement = popupProfile.querySelector(popupSelectors.formSelector);
  const formButtonElement = popupProfile.querySelector(
    popupSelectors.submitButtonSelector
  );
  button.addEventListener("click", () =>
    editProfileButtonEvent(
      popupProfile,
      nameElement,
      jobElement,
      profileNameElement,
      profileJobElement,
      formElement,
      formButtonElement
    )
  );

  formElement.addEventListener("submit", (evt) => {
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
    placeFormSubmitEvent(
      popupPlace,
      formElement,
      nameElement.value,
      linkElement.value
    );
  });
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

  document
    .querySelectorAll(popupSelectors.popupContentSelector)
    .forEach((content) => {
      content.addEventListener("click", (evt) => {
        evt.stopPropagation();
      });
    });
};
