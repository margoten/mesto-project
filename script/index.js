const popupProfile = document.querySelector(".popup_content_profile");
const popupPlace = document.querySelector(".popup_content_place");
const popupImage = document.querySelector(".popup_content_image");
const closeButtons = document.querySelectorAll(".popup__close-button");
const places = document.querySelector(".places__list");
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const imagePopupElement = popupImage.querySelector(".popup__image");
const captionPopupElement = popupImage.querySelector(".popup__image-caption");

const closePopup = (popup) => popup.classList.remove("popup_opened");

const showPopup = (popup) => popup.classList.add("popup_opened");

function fillDefaultPlaces() {
  initialCards.forEach((card) => addPlace(card.name, card.link, places));
}

const imageElementEvent = (imageElement, popup) => {
  imagePopupElement.src = imageElement.src;
  imagePopupElement.atl = imageElement.atl;
  captionPopupElement.textContent = imageElement.atl;
  showPopup(popup);
};

function addPlace(name, link, places) {
  const place = createNewPlace(name, link);
  places.prepend(place);
}

function createNewPlace(nameValue, urlValue) {
  const placeTemplate = document.querySelector("#create_place").content;

  const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
  placeElement.querySelector(".place__name").textContent = nameValue;
  const imageElement = placeElement.querySelector(".place__image");
  imageElement.src = urlValue;
  imageElement.atl = nameValue;

  imageElement.addEventListener("click", () =>
    imageElementEvent(imageElement, popupImage)
  );

  const removeButton = placeElement.querySelector(".place__remove-button");
  removeButton.addEventListener("click", () => removePlaceEvent(placeElement));

  const likeButton = placeElement.querySelector(".place__like-button");
  likeButton.addEventListener("click", () => likeButtonEvent(likeButton));

  return placeElement;
}

function initProfilePopup() {
  const nameElement = popupProfile.querySelector(".popup__input_data_name");
  const jobElement = popupProfile.querySelector(".popup__input_data_description");

  const button = document.querySelector(".profile__edit-button");
  button.addEventListener("click", () =>
    editProfileButtonEvent(popupProfile, nameElement, jobElement)
  );

  const formElement = popupProfile.querySelector(".popup__form");
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileFormSubmitEvent(popupProfile, nameElement, jobElement);
  });
}

function initPlacePopup() {
  const nameElement = popupPlace.querySelector(".popup__input_data_name");
  const linkElement = popupPlace.querySelector(".popup__input_data_description");

  const button = document.querySelector(".profile__add-button");
  button.addEventListener("click", () => showPopup(popupPlace));

  const formElement = popupPlace.querySelector(".popup__form");
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    placeFormSubmitEvent(popupPlace, formElement, nameElement.value, linkElement.value);
  });
}

closeButtons.forEach((button) => {
  button.addEventListener("click", () => closePopup(button.closest(".popup")));
});

const likeButtonEvent = (likeButton) =>
  likeButton.classList.toggle("place__like-button_active");

const removePlaceEvent = (place) => place.remove();

const editProfileButtonEvent = (popup, nameElement, jobElement) => {
  nameElement.value = profileNameElement.textContent;
  jobElement.value = profileJobElement.textContent;
  showPopup(popup);
};

const profileFormSubmitEvent = (popup, nameElement, jobElement) => {
  profileNameElement.textContent = nameElement.value;
  profileJobElement.textContent = jobElement.value;
  closePopup(popup);
};

const placeFormSubmitEvent = (popup, formElement, name, link) => {
  addPlace(name, link, places);
  closePopup(popup);
  formElement.reset();
};


fillDefaultPlaces();
initProfilePopup();
initPlacePopup();

