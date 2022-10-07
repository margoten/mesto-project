import { showPopup } from "./modal.js";
import { initialCards } from "./constants.js";
let imageElements;


const imageElementEvent = (imageElement, imagePopupElement, popup) => {
  imagePopupElement.src = imageElement.src;
  imagePopupElement.atl = imageElement.atl;
  imageElements.captionElement.textContent = imageElement.atl;
  showPopup(popup);
};

const likeButtonEvent = (likeButton) =>
  likeButton.classList.toggle(imageElements.activeLikeButtonClass);

const removePlaceEvent = (place) => place.remove();

const createNewPlace = (nameValue, urlValue) => {
  const placeTemplate = document.querySelector(
    imageElements.placeTemplate
  ).content;

  const placeElement = placeTemplate
    .querySelector(imageElements.placeSelector)
    .cloneNode(true);
  placeElement.querySelector(imageElements.placeNameSelector).textContent =
    nameValue;
  const imageElement = placeElement.querySelector(
    imageElements.placeImageSelector
  );
  imageElement.src = urlValue;
  imageElement.atl = nameValue;

  imageElement.addEventListener("click", () => {
    imageElementEvent(
      imageElement,
      imageElements.fullImageElement,
      imageElements.popupImageElement
    );
  });

  const removeButton = placeElement.querySelector(
    imageElements.removeButtonSelector
  );
  removeButton.addEventListener("click", () => removePlaceEvent(placeElement));

  const likeButton = placeElement.querySelector(
    imageElements.likeButtonSelector
  );
  likeButton.addEventListener("click", () => likeButtonEvent(likeButton));

  return placeElement;
}

export const addPlace = (name, link, places) => {
  const place = createNewPlace(name, link);
  places.prepend(place);
}

const fillDefaultPlaces = (popupImage) => {
  initialCards.forEach((card) => addPlace(card.name, card.link, popupImage));
}


export const enableCards = (obj) => {
  const places = document.querySelector(obj.placesSelector);
  const popupImage = document.querySelector(obj.popupImageSelector);

  imageElements = {
    placesSelector: places,
    popupImageElement: popupImage,
    fullImageElement: popupImage.querySelector(obj.fullImageSelector),
    captionElement: popupImage.querySelector(obj.captionSelector),
    likeButtonSelector: obj.likeButtonSelector,
    activeLikeButtonClass: obj.activeLikeButtonClass,
    removeButtonSelector: obj.removeButtonSelector,
    placeTemplate: obj.placeTemplate,
    placeSelector: obj.placeSelector,
    placeNameSelector: obj.placeNameSelector,
    placeImageSelector: obj.placeImageSelector,
  };
  fillDefaultPlaces(places);
};
