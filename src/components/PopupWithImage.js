import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__image-caption");
  }

  open(src, caption) {
    this._image.src = src;
    this._image.alt = caption;
    this.caption.textContent = caption;
    super.open();
  }
}
