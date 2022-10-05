import { addPlace } from "./card.js";

const popupProfile = document.querySelector(".popup_content_profile");
const popupPlace = document.querySelector(".popup_content_place");
const closeButtons = document.querySelectorAll(".popup__close-button");
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");

export const closePopup = (popup) => popup.classList.remove("popup_opened");

export const showPopup = (popup) => popup.classList.add("popup_opened");

export const initPopupEvets = () => {
  document.body.addEventListener("keydown", function (evt) {
    if (evt.key == "Escape") {
      document.querySelectorAll(".popup_opened").forEach((popup) => {
        closePopup(popup);
      });
    }
  });

  document.querySelectorAll(".popup_content").forEach((popup) => {
    popup.addEventListener("click", function (evt) {
      evt.stopPropagation();
    });
  });
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", function (evt) {
      closePopup(popup);
    });
  });
};

export function initProfilePopup() {
  const nameElement = popupProfile.querySelector(".popup__input_data_name");
  const jobElement = popupProfile.querySelector(
    ".popup__input_data_description"
  );

  const button = document.querySelector(".profile__edit-button");
  button.addEventListener("click", () =>
    editProfileButtonEvent(popupProfile, nameElement, jobElement)
  );

  const formElement = popupProfile.querySelector(".popup__form");
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileFormSubmitEvent(popupProfile, nameElement, jobElement);
  });
}

export function initPlacePopup() {
  const nameElement = popupPlace.querySelector(".popup__input_data_name");
  const linkElement = popupPlace.querySelector(
    ".popup__input_data_description"
  );

  const button = document.querySelector(".profile__add-button");
  button.addEventListener("click", () => showPopup(popupPlace));

  const formElement = popupPlace.querySelector(".popup__form");
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    placeFormSubmitEvent(
      popupPlace,
      formElement,
      nameElement.value,
      linkElement.value
    );
  });
}


const editProfileButtonEvent = (popup, nameElement, jobElement) => {
  nameElement.value = profileNameElement.textContent;
  jobElement.value = profileJobElement.textContent;
  showPopup(popup);
};

const profileFormSubmitEvent = (popup, nameElement, jobElement) => {
  profileNameElement.textContent = nameElement.value;
  profileJobElement.textContent = jobElement.value;
  closePopup(popup);
};

const placeFormSubmitEvent = (popup, formElement, name, link) => {
  addPlace(name, link, places);
  closePopup(popup);
  formElement.reset();
  formElement.resetForm();
};


closeButtons.forEach((button) => {
  button.addEventListener("click", () => closePopup(button.closest(".popup")));
});
