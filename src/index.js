import "./pages/index.css";

import Api from "./components/Api.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector(".profile__avatar-container");

let section;

const createNewCard = (item) => {
  const card = new Card({
    item,
    templateSelector: "#create_place",
    handleCardClick: (src, caption) => popupImage.open(src, caption),
    handleLikeClick: (id, isLiked) =>
      api
        .toogleLikeCard(id, isLiked)
        .then(() => {
          card.toggleLike();
        })
        .catch((error) => {
          console.log(error);
        }),
    handleRemoveClick: (id, element) =>
      api
        .deleteCard(id)
        .then(() => {
          card.removeCard(element);
        })
        .catch((error) => {
          console.log(error);
        }),
    userId: userData._id,
  });
};

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "3701fab1-1ed4-4420-a3e5-6e9ed2eab0d1",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar"
);
const popupImage = new PopupWithImage(".popup_content_image");
popupImage.setEventListeners();

const profilePopup = new PopupWithForm(".popup_content_profile", (evt) => {
  profilePopup.setSubmitterText(evt.submitter, "Сохранение...");
  const request = profilePopup.getInputValues();
  api
    .updateProfileData(request.name, request.description)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar);
      profilePopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      profilePopup.setSubmitterText(evt.submitter, "Сохранить");
    });
});
profilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => profilePopup.show());

const avatarPopup = new PopupWithForm(".popup_content_avatar", (evt) => {
  avatarPopup.setSubmitterText(evt.submitter, "Сохранение...");
  const request = avatarPopup.getInputValues();
  api
    .updateProfileData(request.name, request.description)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar);
      avatarPopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      avatarPopup.setSubmitterText(evt.submitter, "Сохранить");
    });
});

avatarPopup.setEventListeners();

profileAvatar.addEventListener("click", () => avatarPopup.show());

const placePopup = new PopupWithForm(".popup_content_place", (evt) => {
  placePopup.setSubmitterText(evt.submitter, "Сохранение...");
  const request = placePopup.getInputValues();
  api
    .addCard(request.name, request.description)
    .then((data) => {
      const card = createNewCard(data);
      section.addItem(card.createNewPlace());
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      placePopup.setSubmitterText(evt.submitter, "Сохранить");
    });
});
placePopup.setEventListeners();
profileAddButton.addEventListener("click", () => placePopup.show());

const requestInitData = () => {
  Promise.all([api.getProfileData(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
      section = new Section(
        {
          items: cards,
          renderer: (item) => {
            const card = createNewCard(item);
            section.addItem(card.createNewPlace());
          },
        },
        ".places__list"
      );
      section.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
};

const profileFormValidator = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  },
  document.forms.profileEdit
);
const newPlaceFormValidator = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  },
  document.forms.newPlace
);
const avatarEditFormValidator = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  },
  document.forms.avatarEdit
);

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();
requestInitData();
