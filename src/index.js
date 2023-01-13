import "./pages/index.css";
import { initialCards } from "./components/constants.js";
import { addPlace } from "./components/card.js";
import { enableValidation, resetFormStates} from "./components/validate.js";
import { enableModal, showPopup, closePopup } from "./components/modal.js";

const popupProfile = document.querySelector(".popup_content_profile");
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const nameElement = popupProfile.querySelector(".popup__input_data_name");
const jobElement = popupProfile.querySelector(".popup__input_data_description");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupPlace = document.querySelector(".popup_content_place");
const placeNameElement = popupPlace.querySelector(".popup__input_data_name");
const placeLinkElement = popupPlace.querySelector(
  ".popup__input_data_description"
);
const profileAddButton = document.querySelector(".profile__add-button");
const formNewPlace = document.forms.newPlace;
const formEditProfile = document.forms.profileEdit;

const imagePlaces = document.querySelector(".places__list");

const fillDefaultPlaces = () => {
  initialCards.forEach((card) => addPlace(card.name, card.link, imagePlaces));
};

const openProfilePopup = (
  popup,
  nameElement,
  jobElement,
  profileNameElement,
  profileJobElement
) => {
  formEditProfile.reset();
  nameElement.value = profileNameElement.textContent;
  jobElement.value = profileJobElement.textContent;
  showPopup(popup);
};

const handleProfileFormSubmit = (
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

const handlePlaceFormSubmit = (popup, formElement, places, name, link) => {
  addPlace(name, link, places);
  closePopup(popup);
  formElement.reset();
};

const initProfilePopup = () => {
  profileEditButton.addEventListener("click", () =>
    openProfilePopup(
      popupProfile,
      nameElement,
      jobElement,
      profileNameElement,
      profileJobElement,
      formEditProfile
    )
  );

  formEditProfile.addEventListener("submit", () => {
    handleProfileFormSubmit(
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

  formNewPlace.addEventListener("submit", () => {
    handlePlaceFormSubmit(
      popupPlace,
      formNewPlace,
      imagePlaces,
      placeNameElement.value,
      placeLinkElement.value
    );
  });
};

enableModal();

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
