import { showPopup } from "./modal.js";
import { initialCards } from "../constants.js";
let cardsInfo;

const imagePopupElement = popupImage.querySelector(".popup__image");
const captionPopupElement = popupImage.querySelector(".popup__image-caption");


function fillDefaultPlaces(popupImage) {
  initialCards.forEach((card) =>
    addPlace(card.name, card.link, popupImage)
  );
}

export function addPlace(name, link, places) {
  const place = createNewPlace(name, link);
  places.prepend(place);
}

const imageElementEvent = (imageElement, imagePopupElement, popup) => {
  imagePopupElement.src = imageElement.src;
  imagePopupElement.atl = imageElement.atl;
  captionPopupElement.textContent = imageElement.atl;
  showPopup(popup);
};


const likeButtonEvent = (likeButton) =>
  likeButton.classList.toggle("place__like-button_active");

const removePlaceEvent = (place) => place.remove();

function createNewPlace(nameValue, urlValue) {
  const placeTemplate = document.querySelector("#create_place").content;

  const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
  placeElement.querySelector(".place__name").textContent = nameValue;
  const imageElement = placeElement.querySelector(".place__image");
  imageElement.src = urlValue;
  imageElement.atl = nameValue;

  imageElement.addEventListener("click", () => {
    const popupImage = document.querySelector(cardsInfo.placesSelector);

    imageElementEvent(
      imageElement,
      imagePopupElement, cardsInfo.popupImageSelector
    )
  }
    
  );

  const removeButton = placeElement.querySelector(".place__remove-button");
  removeButton.addEventListener("click", () => removePlaceEvent(placeElement));

  const likeButton = placeElement.querySelector(".place__like-button");
  likeButton.addEventListener("click", () => likeButtonEvent(likeButton));

  return placeElement;
}

export const enableCards = (obj) => {
  const popupImage = document.querySelector(obj.placesSelector);

  imageElements = {
    placesSelector: popupImage,
    popupImageElement: document.querySelector(obj.popupImageSelector),
    fullImageElement: popupImage.querySelector(obj.fullImageSelector),
    captionElement: popupImage.querySelector(obj.captionSelector),
  };
  fillDefaultPlaces(popupImage);
};

