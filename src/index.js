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
const formSaveButtonSelector = ".popup__save-button";

const imagePlaces = document.querySelector(".places__list");

const requestProfileData = () => {
  getProfileData()
  .then((data)=> {
    profile.setCurrentUser(data);
    profileNameElement.textContent = data.name;
    profileJobElement.textContent = data.about;
    profileAvatarElement.src = data.avatar;
  })
};

const fillDefaultPlaces = () => {
  getInitialCards()
    .then((data) => {
      data
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
        .forEach((card) => addPlace(card, imagePlaces));
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
  formEditProfile.reset();
  showPopup(popup);
};

const handleProfileFormSubmit = (
  popup,
  nameElement,
  jobElement,
  profileNameElement,
  profileJobElement
) => {
  const saveButton = formEditProfile.querySelector(formSaveButtonSelector);
  saveButton.textContent = "Сохранение..."
  updateProfileData(nameElement.value, jobElement.value)
    .then((data) => {
      profile.setCurrentUser(data);
      profileNameElement.textContent = nameElement.value;
      profileJobElement.textContent = jobElement.value;
      closePopup(popup);
      saveButton.textContent = "Сохранить";
    })
    .catch((error) => {
      console.log(error);
    });
  profileNameElement.textContent = nameElement.value;
  profileJobElement.textContent = jobElement.value;
  closePopup(popup);
};

const handleAvatarFormSubmit = (popup, profileAvatarElement, avatarUrl) => {
  const saveButton = formEditAvatar.querySelector(formSaveButtonSelector);
  saveButton.textContent = "Сохранение...";
  updateAvatar(avatarUrl)
    .then((data) => {
      profile.setCurrentUser(data);
      profileAvatarElement.src = data.avatar;
      closePopup(popup);
      saveButton.textContent = "Сохранить";
    })
    .catch((error) => {
      console.log(error);
    });
};

const handlePlaceFormSubmit = (popup, formElement, places, name, link) => {
  const saveButton = formNewPlace.querySelector(formSaveButtonSelector);
  saveButton.textContent = "Сохранение...";
  addCard(name, link)
    .then((card) => {
      closePopup(popup);
      saveButton.textContent = "Сохранить";
      formElement.reset();
      addPlace(card, places);
    })
    .catch((error) => {
      console.log(error);
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

  formEditProfile.addEventListener("submit", () => {
    handleProfileFormSubmit(
      popupProfile,
      nameElement,
      jobElement,
      profileNameElement,
      profileJobElement
    );
  });
};

const initPlacePopup = () => {
  profileAddButton.addEventListener("click", () => showPopup(popupPlace));

  formNewPlace.addEventListener("submit", () => {
    handlePlaceFormSubmit(
      popupPlace,
      formNewPlace,
      imagePlaces,
      placeNameElement.value,
      placeLinkElement.value
    );
  });
};

const initAvatarPopup = () => {
  profileAvatar.addEventListener("click", () =>
    openAvatarPopup(popupAvatar, formEditAvatar)
  );

  formEditAvatar.addEventListener("submit", () => {
    handleAvatarFormSubmit(
      popupAvatar,
      profileAvatarElement,
      avatarUrlElement.value
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

requestProfileData();
fillDefaultPlaces();
initProfilePopup();
initPlacePopup();
initAvatarPopup();
