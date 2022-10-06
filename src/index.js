import './pages/index.css'
import { initPopupEvets, initPlacePopup, initProfilePopup } from "./components/modal.js";
import { enableCards } from "./components/card.js";
import { enableValidation } from "./components/validate.js";




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

initProfilePopup();
initPlacePopup();
initPopupEvets();

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});
