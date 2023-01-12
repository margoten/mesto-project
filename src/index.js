import "./pages/index.css";
import { initialCards } from "./components/constants.js";
import { addPlace } from "./components/card.js";
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

const placeTemplate = document.querySelector("#create_place");
const removeButtonSelector = ".place__remove-button";
const likeButtonSelector = ".place__like-button";
const placeNameSelector = ".place__name";
const placeImageSelector = ".place__image";
const placeSelector = ".place";

const fillDefaultPlaces = () => {
  initialCards.forEach((card) =>
    addPlace(
      card.name,
      card.link,
      imagePlaces,
      placeTemplate,
      placeSelector,
      placeNameSelector,
      placeImageSelector,
      removeButtonSelector,
      likeButtonSelector
    )
  );
};

const openProfilePopupEvent = (
  popup,
  nameElement,
  jobElement,
  profileNameElement,
  profileJobElement,
  formElement
) => {
  nameElement.value = profileNameElement.textContent;
  jobElement.value = profileJobElement.textContent;
  // resetFormStates(formElement);
  showPopup(popup);
};

const handleProfileFormSubmitEvent = (
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

const handlePlaceFormSubmitEvent = (popup, formElement, places, name, link) => {
  addPlace(
    name,
    link,
    places,
    placeTemplate,
    placeSelector,
    placeNameSelector,
    placeImageSelector,
    removeButtonSelector,
    likeButtonSelector
  );
  closePopup(popup);
  formElement.reset();
};

const initProfilePopup = () => {
  profileEditButton.addEventListener("click", () =>
    openProfilePopupEvent(
      popupProfile,
      nameElement,
      jobElement,
      profileNameElement,
      profileJobElement,
      profileFormElement
    )
  );

  profileFormElement.addEventListener("submit", () => {
    handleProfileFormSubmitEvent(
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
    handlePlaceFormSubmitEvent(
      popupPlace,
      placeFormElement,
      imagePlaces,
      placeNameElement.value,
      placeLinkElement.value
    );
  });
};

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
