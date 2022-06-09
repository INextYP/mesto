export default class Card {
    constructor({ data, cardSelector, handleCardClick }) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".gallery__card-item")
            .cloneNode(true);

        return cardElement;
    }

    generate() {
        this._element = this._getElement();
        this._cardImage = this._element.querySelector(".gallery__card-img");
        this._cardName = this._element.querySelector(".gallery__card-name");
        this._cardLikeButton = this._element.querySelector(
            ".gallery__card-button-like"
        );
        this._cardDeleteButton = this._element.querySelector(
            ".gallery__delete-btn"
        );
        this._setEventListeners();

        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        return this._element;
    }

    _handleLikeCardClick() {
        this._cardLikeButton.classList.toggle(
            "gallery__card-button-like_active"
        );
    }

    _handleCardDelete() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener("click", () =>
            this._handleLikeCardClick()
        );
        this._cardDeleteButton.addEventListener("click", () =>
            this._handleCardDelete()
        );
        this._cardImage.addEventListener("click", this._handleCardClick);
    }
}
