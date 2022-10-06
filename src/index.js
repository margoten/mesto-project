import './pages/index.css'
import { enableCards } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import {enableModal} from "./components/modal.js";




enableCards({
  placesSelector: ".places__list",
  popupImageSelector: ".popup_content_image",
  fullImageSelector: ".popup__image",
  captionSelector: ".popup__image-caption",
  likeButtonSelector: ".place__like-button",
  activeLikeButtonClass: "place__like-button_active",
  removeButtonSelector: ".place__remove-button",
  placeTemplate: "#create_place",
  placeSelector: ".place",
  placeNameSelector: ".place__name",
  placeImageSelector: ".place__image"
});

enableModal({
  inputDataNameSelector: ".popup__input_data_name",
  inputDataDescrSelector: ".popup__input_data_description",
  profileEditButtonSelector: ".profile__edit-button",
  profileAddButtonSelector: ".profile__add-button",
  formSelector: ".popup__form",
  popupSelector: ".popup",
  openPopupClass: "popup_opened",
  popupContentSelector: ".popup_content",
  popupProfileSelector: ".popup_content_profile",
  popupPlaceSelector: ".popup_content_place",
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__description",
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
