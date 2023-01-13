import { showPopup } from "./modal.js";
const activeLikeButtonClass = "place__like-button_active";
const popupImage = document.querySelector(".popup_content_image");
const captionElement = popupImage.querySelector(".popup__image-caption");
const fullImageElement = popupImage.querySelector(".popup__image");
const placeTemplate = document.querySelector("#create_place");
const removeButtonSelector = ".place__remove-button";
const likeButtonSelector = ".place__like-button";
const placeNameSelector = ".place__name";
const placeImageSelector = ".place__image";
const placeSelector = ".place";

const openImage = (imageElement, imagePopupElement, popup) => {
  imagePopupElement.src = imageElement.src;
  imagePopupElement.alt = imageElement.alt;
  captionElement.textContent = imageElement.alt;
  showPopup(popup);
};

const toggleLike = (likeButton) =>
  likeButton.classList.toggle(activeLikeButtonClass);

const removeCard = (card) => card.remove();

const createNewPlace = (nameValue, urlValue) => {
  const placeElement = placeTemplate.content
    .querySelector(placeSelector)
    .cloneNode(true);
  placeElement.querySelector(placeNameSelector).textContent = nameValue;
  const imageElement = placeElement.querySelector(placeImageSelector);
  imageElement.src = urlValue;
  imageElement.alt = nameValue;

  imageElement.addEventListener("click", () => {
    openImage(imageElement, fullImageElement, popupImage);
  });

  const removeButton = placeElement.querySelector(removeButtonSelector);
  removeButton.addEventListener("click", () => removeCard(placeElement));

  const likeButton = placeElement.querySelector(likeButtonSelector);
  likeButton.addEventListener("click", () => toggleLike(likeButton));

  return placeElement;
};

export const addPlace = (name, link, places) => {
  const place = createNewPlace(name, link);
  places.prepend(place);
};
