import "./pages/index.css";
import { initialCards } from "./components/constants.js";
import { enableCards, addPlace } from "./components/card.js";
import { enableValidation, resetFormStates } from "./components/validate.js";
import { enableModal, showPopup, closePopup } from "./components/modal.js";

const imagePlaces = document.querySelector(".places__list");
const popupProfile = document.querySelector(".popup_content_profile");
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const nameElement = popupProfile.querySelector(".popup__input_data_name");
const jobElement = popupProfile.querySelector(".popup__input_data_description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileFormElement = popupProfile.querySelector(".popup__form");

const popupPlace = document.querySelector(".popup_content_place");
const placeNameElement = popupPlace.querySelector(".popup__input_data_name");
const placeLinkElement = popupPlace.querySelector(
  ".popup__input_data_description"
);
const profileAddButton = document.querySelector(".profile__add-button");
const placeFormElement = popupPlace.querySelector(".popup__form");

const fillDefaultPlaces = () => {
  initialCards.forEach((card) => addPlace(card.name, card.link, imagePlaces));
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

const placeFormSubmitEvent = (popup, formElement, places, name, link) => {
  addPlace(name, link, places);
  closePopup(popup);
  formElement.reset();
};

const initProfilePopup = () => {
  profileEditButton.addEventListener("click", () =>
    editProfileButtonEvent(
      popupProfile,
      nameElement,
      jobElement,
      profileNameElement,
      profileJobElement,
      profileFormElement
    )
  );

  profileFormElement.addEventListener("submit", () => {
    profileFormSubmitEvent(
      popupProfile,
      nameElement,
      jobElement,
      profileNameElement,
      profileJobElement
    );
  });
};

const initPlacePopup = () => {
  profileAddButton.addEventListener("click", () => showPopup(popupPlace));

  placeFormElement.addEventListener("submit", () => {
    placeFormSubmitEvent(
      popupPlace,
      placeFormElement,
      imagePlaces,
      placeNameElement.value,
      placeLinkElement.value
    );
  });
};

enableCards({
  popupImageSelector: ".popup_content_image",
  fullImageSelector: ".popup__image",
  captionSelector: ".popup__image-caption",
  likeButtonSelector: ".place__like-button",
  activeLikeButtonClass: "place__like-button_active",
  removeButtonSelector: ".place__remove-button",
  placeTemplate: "#create_place",
  placeSelector: ".place",
  placeNameSelector: ".place__name",
  placeImageSelector: ".place__image",
});

enableModal({
  formSelector: ".popup__form",
  popupSelector: ".popup",
  openPopupClass: "popup_opened",
  popupContentSelector: ".popup_content",
  popupCloseButton: ".popup__close-button",
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});

fillDefaultPlaces();
initProfilePopup();
initPlacePopup();
