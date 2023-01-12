import { showPopup } from "./modal.js";
let cardInfo;

const imageElementEvent = (imageElement, imagePopupElement, popup) => {
  imagePopupElement.src = imageElement.src;
  imagePopupElement.alt = imageElement.alt;
  const popupImage = document.querySelector(cardInfo.popupImageSelector);
  const captionElement = popupImage.querySelector(cardInfo.captionSelector);
  captionElement.textContent = imageElement.alt;
  showPopup(popup);
};

const likeButtonEvent = (likeButton) =>
  likeButton.classList.toggle(cardInfo.activeLikeButtonClass);

const removePlaceEvent = (place) => place.remove();

const createNewPlace = (nameValue, urlValue) => {
  const placeTemplate = document.querySelector(cardInfo.placeTemplate).content;

  const placeElement = placeTemplate
    .querySelector(cardInfo.placeSelector)
    .cloneNode(true);
  placeElement.querySelector(cardInfo.placeNameSelector).textContent =
    nameValue;
  const imageElement = placeElement.querySelector(cardInfo.placeImageSelector);
  imageElement.src = urlValue;
  imageElement.alt = nameValue;

  imageElement.addEventListener("click", () => {
    const popupImage = document.querySelector(cardInfo.popupImageSelector);
    const fullImageElement = popupImage.querySelector(
      cardInfo.fullImageSelector
    );

    imageElementEvent(imageElement, fullImageElement, popupImage);
  });

  const removeButton = placeElement.querySelector(
    cardInfo.removeButtonSelector
  );
  removeButton.addEventListener("click", () => removePlaceEvent(placeElement));

  const likeButton = placeElement.querySelector(cardInfo.likeButtonSelector);
  likeButton.addEventListener("click", () => likeButtonEvent(likeButton));

  return placeElement;
};

export const addPlace = (name, link, places) => {
  const place = createNewPlace(name, link);
  places.prepend(place);
};

export const enableCards = (obj) => {
  cardInfo = obj;
};
