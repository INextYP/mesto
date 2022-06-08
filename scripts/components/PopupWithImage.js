import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector(".popup__img");
        this._popupHeading = this._popupSelector.querySelector(
            ".popup__img-heading"
        );
    }

    open(name, link) {
        this._popupImage.alt = name;
        this._popupHeading.textContent = name;
        this._popupImage.src = link;
        super.open();
    }
}
