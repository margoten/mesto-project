// Организуйте в классе Card код, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card. Когда дойдёте до реализации классов Popup, свяжите класс Card c попапом.
// Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. При клике на карточку эта функция должна открывать попап с картинкой.
class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleRemoveClick,
    userId
  ) {
    this._template = document.querySelector(templateSelector); //"#create_place"
    this._id = data._id;
    this._likes = data.likes;
    this._link = data.link;
    this._name = data.name;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;
    this._userId = userId;
    this._placeSelector = ".place";
    this._activeLikeButtonClass = "place__like-button_active";
    this._removeButtonSelector = ".place__remove-button";
    this._visibleRemoveButtonClass = "place__remove-button_visible";
    this._placeNameSelector = ".place__name";
    this._placeImageSelector = ".place__image";
    this._placeLikeCountSelector = ".place__like-count";

    this._likeButton = placeElement.querySelector(".place__like-button");
  }

  _toggleLike() {
    _likeButton.classList.toggle(this._activeLikeButtonClass);
  }

  _removeCard(element) {
    element.remove();
  }

  createNewPlac() {
    const placeElement = this._template.content
      .querySelector(this.placeSelector)
      .cloneNode(true);
    placeElement.querySelector(this._placeNameSelector).textContent =
      this._.name;
    const imageElement = placeElement.querySelector(this._placeImageSelector);
    imageElement.src = this._.link;
    imageElement.alt = this._.name;

    imageElement.addEventListener("click", () => {
      _handleCardClick(imageElement.src, imageElement.alt);
    });

    const removeButton = placeElement.querySelector(_removeButtonSelector);
    if (this._.owner === this._userId) {
      removeButton.classList.add(this._visibleRemoveButtonClass);
    }

    removeButton.addEventListener("click", () => {
      handleRemoveClick(this._id)
        .then((data) => {
          console.log(data);
          removeCard(placeElement);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    if (this._likes.some((user) => user._id === this._userId)) {
      this._likeButton.classList.add(this._activeLikeButtonClass);
    }
    const likeCount = placeElement.querySelector(this._placeLikeCountSelector);
    likeCount.textContent = this._.likes.length;
    this._likeButton.addEventListener("click", () => {
      const isLiked = this._likeButton.classList.contains(
        this._activeLikeButtonClass
      );
      handleLikeClick(this._id, isLiked)
        .then((data) => {
          console.log(data);
          toggleLike(placeElement);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return placeElement;
  }
}
