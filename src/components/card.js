import { showPopup } from "./modal.js";
import * as profile from "./profile.js";
import { deleteCard, toogleLikeCard } from "./api.js";

const activeLikeButtonClass = "place__like-button_active";
const popupImage = document.querySelector(".popup_content_image");
const captionElement = popupImage.querySelector(".popup__image-caption");
const fullImageElement = popupImage.querySelector(".popup__image");
const placeTemplate = document.querySelector("#create_place");
const removeButtonSelector = ".place__remove-button";
const visibleRemoveButtonClass = "place__remove-button_visible";
const likeButtonSelector = ".place__like-button";
const placeNameSelector = ".place__name";
const placeImageSelector = ".place__image";
const placeSelector = ".place";
const placeLikeCountSelector = ".place__like-count";

const openImage = (imageElement, imagePopupElement, popup) => {
  imagePopupElement.src = imageElement.src;
  imagePopupElement.alt = imageElement.alt;
  captionElement.textContent = imageElement.alt;
  showPopup(popup);
};

const toggleLike = (likeButton) =>
  likeButton.classList.toggle(activeLikeButtonClass);

const removeCard = (card) => card.remove();

const createNewPlace = (card) => {
  const placeElement = placeTemplate.content
    .querySelector(placeSelector)
    .cloneNode(true);
  placeElement.querySelector(placeNameSelector).textContent = card.name;
  const imageElement = placeElement.querySelector(placeImageSelector);
  imageElement.src = card.link;
  imageElement.alt = card.name;

  imageElement.addEventListener("click", () => {
    openImage(imageElement, fullImageElement, popupImage);
  });

  const removeButton = placeElement.querySelector(removeButtonSelector);
  if (profile.isCurrentUser(card.owner)) {
    removeButton.classList.add(visibleRemoveButtonClass);
  }
  removeButton.addEventListener("click", () => {
    deleteCard(card._id)
      .then((data) => {
        console.log(data);
        removeCard(placeElement);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const likeButton = placeElement.querySelector(likeButtonSelector);
  if (profile.isCurrentUserContains(card.likes)) {
    likeButton.classList.add(activeLikeButtonClass);
  }
  const likeCount = placeElement.querySelector(placeLikeCountSelector);
  likeCount.textContent = card.likes.length;
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(activeLikeButtonClass);
    console.log(isLiked);

    toogleLikeCard(card._id, isLiked)
      .then((data) => {
        toggleLike(likeButton);
        likeCount.textContent = data.likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return placeElement;
};

export const addPlace = (card, places) => {
  const place = createNewPlace(card);
  places.prepend(place);
};
