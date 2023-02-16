// Организуйте в классе Card код, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card. Когда дойдёте до реализации классов Popup, свяжите класс Card c попапом.
// Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. При клике на карточку эта функция должна открывать попап с картинкой.
export default class Card {
  constructor({
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleRemoveClick,
    userId
  }) {
    this._template = document.querySelector(templateSelector);
    this._id = data._id;
    this._likes = data.likes;
    this._link = data.link;
    this._name = data.name;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;
    this._userId = userId;
    this._placeElement = this._template.content
      .querySelector(".place")
      .cloneNode(true);
    this._activeLikeButtonClass = "place__like-button_active";
    this._removeButtonSelector = ".place__remove-button";
    this._visibleRemoveButtonClass = "place__remove-button_visible";
    this._placeNameSelector = ".place__name";
    this._placeImageSelector = ".place__image";
    this._placeLikeCountSelector = ".place__like-count";
    this._likeButton = this._placeElement.querySelector(".place__like-button");
    this._likeCount = this._placeElement.querySelector(this._placeLikeCountSelector);
  }

  toggleLike(count) {
    this._likeButton.classList.toggle(this._activeLikeButtonClass);
    this._likeCount.textContent = count;
  }

  removeCard(element) {
    element.remove();
  }

  createNewPlace() {
    this._placeElement.querySelector(this._placeNameSelector).textContent = this._name;
    const imageElement = this._placeElement.querySelector(this._placeImageSelector);
    imageElement.src = this._link;
    imageElement.alt = this._name;

    imageElement.addEventListener("click", () => {
      this._handleCardClick(imageElement.src, imageElement.alt);
    });

    const removeButton = this._placeElement.querySelector(this._removeButtonSelector);
    if (this._ownerId === this._userId) {
      removeButton.classList.add(this._visibleRemoveButtonClass);
    }

    removeButton.addEventListener("click", () => {
      this._handleRemoveClick(this._id, this._placeElement);
    });

    if (this._likes.some((user) => user._id === this._userId)) {
      this._likeButton.classList.add(this._activeLikeButtonClass);
    }
    
    this._likeCount.textContent = this._likes.length;

    this._likeButton.addEventListener("click", () => {
      const isLiked = this._likeButton.classList.contains(
        this._activeLikeButtonClass
      );
      this._handleLikeClick(this._id, isLiked)
       
    });
    return this._placeElement;
  }
}
