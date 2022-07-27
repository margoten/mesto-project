const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const popupProfile = document.querySelector(".popup_content_profile");
const popupPlace = document.querySelector(".popup_content_place");
const popupImage = document.querySelector(".popup_content_image");
const closeButtons = document.querySelectorAll(".popup__close-button");
const places = document.querySelector(".places__list");
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => togglePopup(button.closest(".popup")));
});

fillDefaultPlaces();
initProfilePopup();
initPlacePopup();

const togglePopup = (popup) => popup.classList.toggle("popup_opened");

function fillDefaultPlaces() {
  initialCards.forEach((card) => addPlace(card.name, card.link, places));
}

const imageElementEvent = (imageElement, popup) => {
  const imagePopupElement = popup.querySelector(".popup__image");
  imagePopupElement.src = imageElement.src;
  imagePopupElement.atl = imageElement.atl;
  const captionPopupElement = popup.querySelector(".popup__image-caption");
  captionPopupElement.textContent = imageElement.atl;
  togglePopup(popup);
};

const likeButtonEvent = (likeButton) =>
  likeButton.classList.toggle("place__like-button_active");

const removePlaceEvent = (place) => place.remove();

const editProfileButtonEvent = (popup, nameElement, jobElement) => {
  nameElement.value = profileNameElement.textContent;
  jobElement.value = profileJobElement.textContent;
  togglePopup(popup);
};

const profileFormSubmitEvent = (popup, nameElement, jobElement) => {
  profileNameElement.textContent = nameElement.value;
  profileJobElement.textContent = jobElement.value;
  togglePopup(popup);
};

const placeFormSubmitEvent = (popup, nameElement, linkElement) => {
  addPlace(nameElement.value, linkElement.value, places);
  togglePopup(popup);
  nameElement.value = "";
  linkElement.value = "";
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
  button.addEventListener("click", () => togglePopup(popupPlace));

  const formElement = popupPlace.querySelector(".popup__form");
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    placeFormSubmitEvent(popupPlace, nameElement, linkElement);
  });
}
