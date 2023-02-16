import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupClass) {
    super(popupClass);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__image-caption");
  }

  show(src, caption) {
    this._image.src = src;
    this._image.alt = caption;
    this._caption.textContent = caption;
    super.show();
  }
}
