import "./pages/index.css";
import { addPlace } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import { enableModal, showPopup, closePopup } from "./components/modal.js";
import {
  getInitialCards,
  updateAvatar,
  addCard,
  updateProfileData,
  getProfileData,
} from "./components/api.js";
import * as profile from "./components/profile";

const popupProfile = document.querySelector(".popup_content_profile");
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const profileAvatarElement = document.querySelector(".profile__avatar");
const nameElement = popupProfile.querySelector(".popup__input_data_name");
const jobElement = popupProfile.querySelector(".popup__input_data_description");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupPlace = document.querySelector(".popup_content_place");
const placeNameElement = popupPlace.querySelector(".popup__input_data_name");
const placeLinkElement = popupPlace.querySelector(
  ".popup__input_data_description"
);
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector(".profile__avatar-container");
const popupAvatar = document.querySelector(".popup_content_avatar");
const avatarUrlElement = popupAvatar.querySelector(
  ".popup__input_data_description"
);
const formNewPlace = document.forms.newPlace;
const formEditProfile = document.forms.profileEdit;
const formEditAvatar = document.forms.avatarEdit;

const imagePlaces = document.querySelector(".places__list");

const fillCards = (cards) => {
  cards
    .sort((x, y) => {
      return new Date(x.createdAt) < new Date(y.createdAt) ? -1 : 1;
    })
    .forEach((card) => addPlace(card, imagePlaces));
};

const setProfileData = (userData) => {
  profile.setCurrentUser(userData);
  profileNameElement.textContent = userData.name;
  profileJobElement.textContent = userData.about;
  profileAvatarElement.src = userData.avatar;
};

const requestInitData = () => {
  Promise.all([getProfileData(), getInitialCards()])
    .then(([userData, cards]) => {
      setProfileData(userData);
      fillCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
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

const openAvatarPopup = (popup) => {
  formEditAvatar.reset();
  showPopup(popup);
};

const handleProfileFormSubmit = (
  popup,
  nameElement,
  jobElement,
  profileNameElement,
  profileJobElement,
  button
) => {
  button.textContent = "Сохранение...";
  updateProfileData(nameElement.value, jobElement.value)
    .then((data) => {
      profile.setCurrentUser(data);
      profileNameElement.textContent = nameElement.value;
      profileJobElement.textContent = jobElement.value;
      closePopup(popup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
};

const handleAvatarFormSubmit = (
  popup,
  profileAvatarElement,
  avatarUrl,
  button
) => {
  button.textContent = "Сохранение...";
  updateAvatar(avatarUrl)
    .then((data) => {
      profile.setCurrentUser(data);
      profileAvatarElement.src = data.avatar;
      closePopup(popup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
};

const handlePlaceFormSubmit = (
  popup,
  formElement,
  places,
  name,
  link,
  button
) => {
  button.textContent = "Сохранение...";
  addCard(name, link)
    .then((card) => {
      closePopup(popup);
      formElement.reset();
      addPlace(card, places);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
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

  formEditProfile.addEventListener("submit", (evt) => {
    handleProfileFormSubmit(
      popupProfile,
      nameElement,
      jobElement,
      profileNameElement,
      profileJobElement,
      evt.submitter
    );
  });
};

const initPlacePopup = () => {
  profileAddButton.addEventListener("click", () => showPopup(popupPlace));

  formNewPlace.addEventListener("submit", (evt) => {
    handlePlaceFormSubmit(
      popupPlace,
      formNewPlace,
      imagePlaces,
      placeNameElement.value,
      placeLinkElement.value,
      evt.submitter
    );
  });
};

const initAvatarPopup = () => {
  profileAvatar.addEventListener("click", () =>
    openAvatarPopup(popupAvatar, formEditAvatar)
  );

  formEditAvatar.addEventListener("submit", (evt) => {
    handleAvatarFormSubmit(
      popupAvatar,
      profileAvatarElement,
      avatarUrlElement.value,
      evt.submitter
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

requestInitData();
initProfilePopup();
initPlacePopup();
initAvatarPopup();
